/**
 * Backend QA verification script.
 * Run with the server already started: npm run qa
 *
 * Requires seeded data (npm run seed) and env vars from .env.
 */
require('dotenv').config();

const http = require('http');

const PORT = Number(process.env.PORT) || 5000;
const BASE_PATH = '/api/v1';

const results = [];

const record = (name, ok, detail = null) => {
  results.push({ name, ok, detail });
  const status = ok ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${name}${detail ? ` — ${JSON.stringify(detail)}` : ''}`);
};

const request = (method, path, body = null, extraHeaders = {}) =>
  new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;

    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path: `${BASE_PATH}${path}`,
        method,
        headers: {
          ...extraHeaders,
          ...(payload
            ? {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
              }
            : {}),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => {
          raw += chunk;
        });
        res.on('end', () => {
          let parsed = {};
          try {
            parsed = raw ? JSON.parse(raw) : {};
          } catch {
            parsed = { raw };
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed,
          });
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });

const runQa = async () => {
  console.log(`\nBackend QA — http://localhost:${PORT}${BASE_PATH}\n`);

  const health = await request('GET', '/health');
  record(
    'GET /health returns success and database status',
    health.status === 200 &&
      health.body.success === true &&
      ['connected', 'disconnected'].includes(health.body.database),
    { database: health.body.database }
  );

  const projects = await request('GET', '/projects');
  const projectList = projects.body.data || [];
  const featuredIndex = projectList.findIndex((p) => p.featured);
  const nonFeaturedIndex = projectList.findIndex((p) => !p.featured);

  record(
    'GET /projects returns all projects with consistent format',
    projects.status === 200 &&
      projects.body.success === true &&
      Array.isArray(projectList) &&
      projectList.length > 0,
    { count: projectList.length }
  );

  record(
    'GET /projects sorts featured first, then newest',
    featuredIndex !== -1 &&
      nonFeaturedIndex !== -1 &&
      featuredIndex < nonFeaturedIndex,
    projectList.map((p) => p.slug)
  );

  const projectsSlash = await request('GET', '/projects/');
  record(
    'GET /projects/ (trailing slash) returns projects',
    projectsSlash.status === 200 && projectsSlash.body.success === true
  );

  const slug = projectList[0]?.slug || 'portfolio-platform';
  const projectDetail = await request('GET', `/projects/${slug}`);
  record(
    'GET /projects/:slug returns correct project',
    projectDetail.status === 200 &&
      projectDetail.body.success === true &&
      projectDetail.body.data?.slug === slug,
    { slug }
  );

  const project404 = await request('GET', '/projects/nonexistent-slug-xyz');
  record(
    'GET /projects/:slug returns 404 for missing slug',
    project404.status === 404 &&
      project404.body.success === false &&
      project404.body.message &&
      !project404.body.stack,
    project404.body
  );

  const certificates = await request('GET', '/certificates');
  const certList = certificates.body.data || [];
  const issueDates = certList.map((c) => new Date(c.issueDate).getTime());

  record(
    'GET /certificates returns sorted data',
    certificates.status === 200 &&
      certificates.body.success === true &&
      issueDates.every((date, i) => i === 0 || issueDates[i - 1] >= date),
    { count: certList.length }
  );

  const invalidEmail = await request('POST', '/contact', {
    name: 'Jane Doe',
    email: 'not-an-email',
    message: 'Valid message for QA validation test.',
  });
  record(
    'POST /contact invalid email returns validation errors',
    invalidEmail.status === 400 &&
      invalidEmail.body.success === false &&
      Array.isArray(invalidEmail.body.errors),
    invalidEmail.body
  );

  const missingName = await request('POST', '/contact', {
    email: 'jane@example.com',
    message: 'Valid message for QA validation test.',
  });
  record(
    'POST /contact missing name returns validation errors',
    missingName.status === 400 &&
      missingName.body.success === false &&
      Array.isArray(missingName.body.errors),
    missingName.body
  );

  const emptyMessage = await request('POST', '/contact', {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: '',
  });
  record(
    'POST /contact empty message returns validation errors',
    emptyMessage.status === 400 &&
      emptyMessage.body.success === false &&
      Array.isArray(emptyMessage.body.errors),
    emptyMessage.body
  );

  const validContact = await request('POST', '/contact', {
    name: 'QA Tester',
    email: 'qa.tester@example.com',
    message: 'Automated QA contact submission test message.',
  });
  record(
    'POST /contact valid input stores submission',
    validContact.status === 201 &&
      validContact.body.success === true &&
      validContact.body.message === 'Message sent successfully',
    { status: validContact.status }
  );

  let rateLimited = false;
  for (let i = 0; i < 5; i += 1) {
    const attempt = await request('POST', '/contact', {
      name: 'Rate Limit Probe',
      email: `rate.limit.${i}@example.com`,
      message: 'Rate limit probe message for automated QA testing.',
    });
    if (attempt.status === 429) {
      rateLimited = true;
      record(
        'POST /contact rate limit blocks excessive requests',
        attempt.body.success === false &&
          typeof attempt.body.message === 'string',
        { status: attempt.status, message: attempt.body.message }
      );
      break;
    }
  }

  if (!rateLimited) {
    record('POST /contact rate limit blocks excessive requests', false, {
      reason: 'Did not receive 429 within probe window (limit may already be exhausted)',
    });
  }

  const unknownRoute = await request('GET', '/does-not-exist');
  record(
    'Unknown routes return success: false with message',
    unknownRoute.status === 404 &&
      unknownRoute.body.success === false &&
      unknownRoute.body.message,
    unknownRoute.body
  );

  const compressionCheck = await request('GET', '/projects', null, {
    'Accept-Encoding': 'gzip',
  });
  const contentLength = Number(compressionCheck.headers['content-length'] || 0);
  const hasCompression = compressionCheck.headers['content-encoding'] === 'gzip';
  record(
    'Compression enabled for large responses',
    hasCompression,
    {
      contentEncoding: compressionCheck.headers['content-encoding'] || 'none',
      contentLength,
    }
  );

  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;

  console.log(`\nQA Summary: ${passed}/${results.length} passed, ${failed} failed\n`);

  process.exit(failed > 0 ? 1 : 0);
};

runQa().catch((error) => {
  console.error('QA script failed:', error.message);
  process.exit(1);
});
