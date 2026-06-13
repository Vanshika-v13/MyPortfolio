import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO() {
  const title = "Vanshika Verma | Full Stack Developer";
  const description = "Full Stack Developer focused on backend engineering, scalable systems, and building high-performance digital products.";
  const url = "https://vanshikaverma.com"; // Placeholder URL
  const image = "https://vanshikaverma.com/og-image.jpg"; // Placeholder OG image

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Best Practices */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Vanshika Verma" />
    </Helmet>
  );
}
