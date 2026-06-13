import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div>
      <h2 className="text-xs font-semibold tracking-widest uppercase text-[#6B7A90] mb-6">
        Additional Screenshots
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((image, idx) => {
          const url = typeof image === 'string' ? image : image.url;
          const caption =
            typeof image === 'string' ? `Screenshot ${idx + 1}` : image.caption;

          return (
            <motion.button
              key={idx}
              onClick={() => setSelectedImage({ url, caption })}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative aspect-video w-full rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,229,255,0.1)',
              }}
              aria-label={`View ${caption}`}
            >
              <img
                src={url}
                alt={caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#050B14] opacity-0 group-hover:opacity-40 transition-opacity flex items-center justify-center">
                <span className="text-[#E6F1FF] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,11,20,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40"
            style={{ color: '#A9B4C7', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Close image"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-xl mx-auto"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
            />
            {selectedImage.caption && (
              <p className="mt-4 text-center text-sm text-[#6B7A90]">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
