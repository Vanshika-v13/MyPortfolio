import scatchEcommerce2 from '../assets/scatchEcommerce2.png';
import taskFlow2 from '../assets/TaskFlow2.png';
import scamDetector2 from '../assets/scamDetector2.png';
import blogify2 from '../assets/Blogify2.png';

/**
 * ─── CENTRALIZED PROJECT DATA ──────────────────────────────────────────────
 *
 * To add a new project, append one object to this array.
 * No route, component, or configuration changes are required.
 *
 * Field reference:
 *   id            – unique identifier (string)
 *   slug          – URL-safe identifier used in /projects/:slug
 *   title         – display name
 *   shortDescription – 1-2 sentence summary shown on the card
 *   description   – full paragraph(s) shown on the detail page
 *   thumbnail     – card + hero image URL (use /public path or external URL)
 *   technologies  – array of tech names shown as badges
 *   githubUrl     – source code link (optional)
 *   liveUrl       – live demo URL (optional)
 *   features      – array of { title, description } objects for Key Features
 *   gallery       – array of image URLs (shown as strip + lightbox on detail page)
 *   featured      – boolean; featured projects get a status badge
 */

const projects = [
  /* ── QuickCrave ─────────────────────────────────────────────────── */
  {
    id: 'quickcrave',
    slug: 'quickcrave',
    title: 'QuickCrave — Food Delivery App',
    shortDescription:
      'Real-time food delivery platform with AI chatbot ordering, live GPS tracking via WebSockets, and role-based access for customers, riders, and admins.',
    description:
      'QuickCrave is a production-grade food delivery platform built for high concurrency and real-time responsiveness. ' +
      'Customers can browse restaurants, build orders through a conversational AI chatbot powered by Dialogflow, and track their rider\'s GPS location live on a map. ' +
      'Riders receive instant order notifications and push location updates through dedicated WebSocket rooms. ' +
      'Admins get a full dashboard for managing users, orders, and restaurants. ' +
      'The backend is built on FastAPI with asynchronous MongoDB operations via Motor, Redis for session carts and GPS deduplication, and a WebSocket architecture that scales across concurrent order rooms. ' +
      'The frontend is a Vite + React SPA styled with Tailwind CSS, consuming both REST and WebSocket endpoints.',
    thumbnail: '/quickCrave.png',
    technologies: [
      'FastAPI',
      'Python',
      'MongoDB',
      'Motor',
      'Redis',
      'WebSockets',
      'Dialogflow',
      'React',
      'Vite',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/Vanshika-v13/QuickCrave-Food-Delievery-Project',
    liveUrl: 'https://quick-crave-food-delievery-project.vercel.app/',
    features: [
      {
        title: 'AI Chatbot Ordering',
        description:
          'Conversational ordering experience powered by Dialogflow — customers describe what they want in natural language and the bot builds their cart.',
      },
      {
        title: 'Live GPS Rider Tracking',
        description:
          'WebSocket rooms per active order stream rider coordinates in real time, with Redis deduplication preventing redundant GPS broadcasts.',
      },
      {
        title: 'Role-Based Access Control',
        description:
          'Separate authenticated flows for Customers, Riders, and Admins — each with scoped dashboards, permissions, and API access.',
      },
      {
        title: 'In-Memory Session Cart (Redis)',
        description:
          'Cart state is stored in Redis for sub-millisecond reads, enabling seamless chatbot-to-checkout flows without touching the database on every interaction.',
      },
      {
        title: 'Async FastAPI Backend',
        description:
          'FastAPI with Motor (async MongoDB driver) handles thousands of concurrent WebSocket connections without blocking, critical for real-time order tracking.',
      },
      {
        title: 'Instant Order Notifications',
        description:
          'Riders and admins receive push notifications the moment a new order is placed, enabling fast dispatch and minimal delivery wait times.',
      },
    ],
    gallery: ['/quickCrave.png'],
    featured: true,
  },

  /* ────────────────────────────────────────────────────────────────── */
  /* Add your next project here — just copy the object above and fill  */
  /* in the fields. The card and detail page will appear automatically. */
  /* ────────────────────────────────────────────────────────────────── */
  /* ── Scatch ─────────────────────────────────────────────────────── */
  {
    id: 'scatch',
    slug: 'scatch',
    title: 'Scatch — E-commerce Platform',
    shortDescription:
      'Comprehensive e-commerce platform featuring JWT authentication, dynamic product filtering, and seamless Razorpay integration for secure checkouts.',
    description:
      'Scatch is a full-stack e-commerce solution architected with Node.js, Express, and MongoDB. ' +
      'It provides a robust dual-interface system catering to both customers and administrators. ' +
      'Customers experience a seamless shopping journey with advanced product filtering, dynamic cart calculations, and secure online payments integrated via Razorpay. ' +
      'On the administrative side, the platform offers a comprehensive dashboard for catalog management, order tracking, and user oversight. ' +
      'The application leverages server-side rendering with EJS and Tailwind CSS for a responsive, modern UI, while maintaining strong security protocols using JWT and bcrypt for authentication.',
    thumbnail: '/ScatchEcommerce.png',
    detailsImage: scatchEcommerce2,
    technologies: [
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'EJS',
      'JWT',
      'Razorpay',
    ],
    githubUrl: 'https://github.com/Vanshika-v13/Scatch-Ecommerce',
    liveUrl: 'https://scatch-ecommerce-1-8wy2.onrender.com',
    features: [
      {
        title: 'Secure Authentication',
        description: 'JWT-based login and registration with encrypted passwords via bcrypt for secure access.',
      },
      {
        title: 'Advanced Shopping Cart',
        description: 'Interactive cart with real-time calculations of MRP, discounts, and net totals, plus seamless Razorpay checkout.',
      },
      {
        title: 'Smart Product Filtering',
        description: 'Dynamic homepage and catalog with filtering by category, gender, and sorting by price or newest arrivals.',
      },
      {
        title: 'Comprehensive Admin Dashboard',
        description: 'Centralized control for product management, visual customization, order status updates, and customer tracking.',
      },
      {
        title: 'Order Tracking & History',
        description: 'Dedicated sections for customers to view past purchases and monitor the real-time progress of deliveries.',
      },
      {
        title: 'Privilege Club Loyalty Program',
        description: 'Integrated loyalty system offering exclusive benefits like watch servicing and early access to sales.',
      },
    ],
    gallery: ['/ScatchEcommerce.png'],
    featured: false,
  },
  /* ── taskFlow ───────────────────────────────────────────────────── */
  {
    id: 'taskflow',
    slug: 'taskflow',
    title: 'taskFlow — Task Management System',
    shortDescription:
      'High-performance collaboration platform featuring a real-time drag-and-drop Kanban board, role-based access control, and live Socket.io notifications.',
    description:
      'taskFlow is a robust, full-stack Task Management System designed for high-performance collaboration. ' +
      'Built on a modular MVC architecture using Next.js App Router and MongoDB, it ensures optimal performance and scalability. ' +
      'The application features a comprehensive drag-and-drop Kanban board powered by @dnd-kit, enabling seamless task categorization and workflow management. ' +
      'Real-time synchronization is achieved via Socket.io, broadcasting live updates for task assignments, status changes, and threaded comments. ' +
      'Security and access control are strictly enforced through a granular Role-Based Access Control (RBAC) system and session management using httpOnly cookies. ' +
      'With global state handled via Zustand and a fully responsive Tailwind CSS interface, taskFlow delivers a premium, uninterrupted user experience.',
    thumbnail: '/TaskFlow.png',
    detailsImage: taskFlow2,
    technologies: [
      'Next.js',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.io',
      'Tailwind CSS',
      'Zustand',
      '@dnd-kit',
    ],
    githubUrl: 'https://github.com/Vanshika-v13/task-management-system',
    liveUrl: 'https://task-management-system-roan-pi.vercel.app/',
    features: [
      {
        title: 'Interactive Kanban Board',
        description: 'Visual drag-and-drop interface powered by @dnd-kit for managing tasks across To Do, In Progress, Review, and Completed columns.',
      },
      {
        title: 'Real-Time Synchronization',
        description: 'Socket.io integration broadcasts live updates for notifications, task state changes, and new comments across all active clients.',
      },
      {
        title: 'Granular Access Control',
        description: 'Strict Role-Based Access Control (RBAC) securing projects, supported by persistent session management using httpOnly cookies.',
      },
      {
        title: 'High-Performance State Management',
        description: 'Global state handling utilizing Zustand stores to manage authentication, tasks, and notifications efficiently without prop drilling.',
      },
      {
        title: 'Collaborative Threading',
        description: 'Detailed activity tracking and nested comments system, allowing team members to discuss and track granular sub-tasks or checklist items.',
      },
      {
        title: 'Modern Architecture',
        description: 'Leverages Next.js App Router for optimal SEO and client-side performance, backed by a scalable Node.js/MongoDB REST API.',
      },
    ],
    gallery: ['/TaskFlow.png'],
    featured: false,
  },
  /* ── AI Scam Detector ───────────────────────────────────────────── */
  {
    id: 'aiscamdetector',
    slug: 'aiscamdetector',
    title: 'AI Scam Detector — Fraud Analysis System',
    shortDescription:
      'Sophisticated NLP-powered application leveraging OpenAI GPT models to instantly identify, categorize, and explain digital threats like phishing and job fraud.',
    description:
      'AI Scam Detector is a high-performance, real-time fraud analysis system designed to evaluate suspicious messages and mitigate digital threats. ' +
      'Powered by OpenAI\'s GPT models, the platform performs sophisticated Natural Language Processing (NLP) to classify messages with precise confidence metrics and risk scoring. ' +
      'It delivers comprehensive risk profiling, dynamically highlighting malicious phrases within the text while generating immediate safety protocols and prevention tips for the user. ' +
      'Built with a modern React 19 frontend and a scalable Node.js/Express backend, the system ensures rapid evaluation, incorporating a robust fallback mock analysis architecture when API access is unavailable.',
    thumbnail: '/scamDetector.png',
    detailsImage: scamDetector2,
    technologies: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'OpenAI SDK',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/Vanshika-v13/AI-Scam-Detector',
    liveUrl: 'https://ai-scam-detector-theta.vercel.app/',
    features: [
      {
        title: 'Real-Time AI Analysis',
        description: 'Instantly processes and evaluates user inputs via OpenAI\'s gpt-4o-mini, delivering highly accurate classifications for various threat models.',
      },
      {
        title: 'Comprehensive Risk Profiling',
        description: 'Provides detailed diagnostic verdicts including categorical scam identification, numerical risk scoring, and AI confidence indicators.',
      },
      {
        title: 'Dynamic Phrase Highlighting',
        description: 'Automatically detects and visually extracts the precise text segments that triggered the NLP analysis flags.',
      },
      {
        title: 'Actionable Mitigation Advice',
        description: 'Generates context-aware, immediate "Safety Advice" alongside long-term prevention strategies to secure the end-user.',
      },
      {
        title: 'Interactive Threat Templates',
        description: 'Includes a suite of built-in mock templates representing common attack vectors (e.g., KYC, remote job, UPI cashback) for user education.',
      },
      {
        title: 'Robust Fallback Architecture',
        description: 'Engineered with an intelligent mock-analysis mode that ensures uninterrupted demonstration capabilities if the primary API is degraded.',
      },
    ],
    gallery: ['/scamDetector.png'],
    featured: false,
  },
  /* ── Blogify ────────────────────────────────────────────────────── */
  {
    id: 'blogify',
    slug: 'blogify',
    title: 'Blogify — Full-Stack Blogging Platform',
    shortDescription:
      'Robust server-side rendered blogging application featuring secure custom JWT authentication, dynamic content management, and real-time interactive commenting.',
    description:
      'Blogify is a scalable, full-stack content sharing platform engineered with Node.js, Express, and MongoDB. ' +
      'It leverages EJS for fast, server-side rendered views, delivering a highly interactive and seamless user experience. ' +
      'Security is paramount, utilizing a custom JWT-based authentication system with persistent httpOnly cookies and HMAC-SHA256 password hashing fortified with unique per-user salts. ' +
      'The platform empowers users to author rich blog posts with integrated cover image uploads via Multer, while fostering engagement through a dynamic, real-time commenting system. ' +
      'Built upon a clean MVC architecture with modular routing and custom middleware, Blogify establishes a highly secure and scalable foundation for modern social applications.',
    thumbnail: '/Blogify.png',
    detailsImage: blogify2,
    technologies: [
      'Node.js',
      'Express',
      'MongoDB',
      'EJS',
      'JWT',
      'Multer',
      'Bootstrap',
    ],
    githubUrl: 'https://github.com/Vanshika-v13/Blogging-Project',
    liveUrl: 'https://blogging-project-5.onrender.com',
    features: [
      {
        title: 'Hardened Security & Auth',
        description: 'Implements custom JWT session management via secure cookies and HMAC-SHA256 password hashing with unique salts.',
      },
      {
        title: 'Dynamic Blog Management',
        description: 'Enables users to author, publish, and manage rich-text blog posts, complete with file processing for cover image uploads via Multer.',
      },
      {
        title: 'Interactive Commenting Engine',
        description: 'A dynamic, real-time commenting system that automatically attributes responses to user profiles and instantly reflects discussions.',
      },
      {
        title: 'Server-Side Rendering',
        description: 'Utilizes EJS templating and partials (navbars, footers) to deliver extremely fast, SEO-friendly HTML to the client.',
      },
      {
        title: 'Modular Backend Architecture',
        description: 'Cleanly separated routing logic and custom middleware (e.g., authentication guards) ensuring scalable and maintainable codebase.',
      },
      {
        title: 'Automated Profiling & UX',
        description: 'Features immediate visual flash notifications and automatically provisions default avatars for new user registrations.',
      },
    ],
    gallery: ['/Blogify.png'],
    featured: false,
  },
  /* ── TaskSync ───────────────────────────────────────────────────── */
  {
    id: 'tasksync',
    slug: 'tasksync',
    title: 'TaskSync — Enterprise Task Management',
    shortDescription:
      'Production-ready task management platform featuring Role-Based Access Control, automated session management, and fully documented RESTful APIs.',
    description:
      'TaskSync is a robust, full-stack task management application engineered for production environments. ' +
      'It leverages a high-performance React frontend and a clean Node.js/Express backend architecture connected to MongoDB. ' +
      'The system ensures maximum security with stateless JWT authorization, strong bcryptjs password cryptography, and a strict Role-Based Access Control (RBAC) model. ' +
      'Administrators are provided with specialized oversight panels and system-wide metrics, while end-users benefit from responsive dashboards, auto-logout interceptors, and strict client-side routing guards. ' +
      'For developers, the backend integrates Swagger UI for interactive API documentation and express-validator for rigorous schema payload constraints.',
    thumbnail: '/TaskSync.png',
    technologies: [
      'React',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Swagger UI',
    ],
    githubUrl: 'https://github.com/Vanshika-v13/TaskSync',
    liveUrl: 'https://task-sync-olive.vercel.app/',
    features: [
      {
        title: 'Stateless Authentication',
        description: 'Secure, JWT-based authorization architecture protecting endpoints alongside strong bcryptjs password hashing.',
      },
      {
        title: 'Role-Based Access Control',
        description: 'Enforces distinct permission boundaries between standard users and system administrators, safeguarding sensitive data operations.',
      },
      {
        title: 'Automated Session Security',
        description: 'Global Axios interceptors automatically monitor token validity, dynamically clearing local storage and auto-logging out expired sessions.',
      },
      {
        title: 'Interactive API Documentation',
        description: 'Backend endpoints are fully documented and testable in real-time via integrated Swagger UI and swagger-jsdoc.',
      },
      {
        title: 'Strict Data Validation',
        description: 'Implements rigorous schema-based payload constraints using express-validator to prevent malformed requests and injection attacks.',
      },
      {
        title: 'Dedicated Admin Oversight',
        description: 'Specialized administrative dashboards providing system-wide statistical cards (total, pending, completed) and global task management.',
      },
    ],
    gallery: ['/TaskSync.png'],
    featured: false,
  },
];

export default projects;
