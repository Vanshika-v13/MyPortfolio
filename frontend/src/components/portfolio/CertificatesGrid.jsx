import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
import { useCertificates } from '../../hooks/usePortfolioData';

function CertificateSkeleton() {
  return (
    <div className="flex flex-col rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(0,229,255,0.12)] overflow-hidden animate-pulse h-[260px]">
      <div className="w-full h-48 bg-[#071425]"></div>
      <div className="p-4 mt-auto">
        <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-1/2"></div>
      </div>
    </div>
  );
}

function CertificateOverlay({ certificate, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!certificate) return null;

  const content = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
      style={{ background: 'rgba(5,11,20,0.65)', backdropFilter: 'blur(10px)' }}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-[#071425] border border-[rgba(0,229,255,0.08)] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[#050B14]/80 text-[#A9B4C7] hover:text-[#E6F1FF] backdrop-blur-md border border-[rgba(0,229,255,0.12)] hover:border-[rgba(0,229,255,0.3)] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Preview (16/9) */}
        <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.03)] relative p-5 lg:p-8 bg-[#050B14]">
          <div 
            className="w-full flex items-center justify-center p-2 rounded-lg" 
            style={{ 
              aspectRatio: '16/9',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))',
              border: '1px solid rgba(0,229,255,0.08)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 18px rgba(0,0,0,0.20)'
            }}
          >
            {certificate.thumbnail ? (
              <img 
                src={certificate.thumbnail} 
                alt={certificate.title} 
                className="w-full h-full object-contain drop-shadow-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6B7A90]">
                <Award className="w-12 h-12 opacity-30" />
              </div>
            )}
          </div>
        </div>

        {/* Certificate Details */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col bg-[#071425] p-5 lg:p-8">
          
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.15)] text-[rgba(0,229,255,0.9)] text-[10px] font-bold tracking-wider uppercase rounded">
              {certificate.status || 'Verified'}
            </span>
          </div>

          <div className="pb-4 border-b border-[rgba(255,255,255,0.03)]">
            <h3 className="text-xl lg:text-2xl font-bold text-[#E6F1FF] mb-2 leading-tight">
              {certificate.title}
            </h3>
            {certificate.description && (
              <p className="text-xs lg:text-sm text-[#A9B4C7] leading-relaxed line-clamp-3">
                {certificate.description}
              </p>
            )}
          </div>

          <div className="py-4 border-b border-[rgba(255,255,255,0.03)] grid grid-cols-2 gap-y-3 gap-x-4">
            <div>
              <p className="text-[10px] font-semibold text-[#6B7A90] uppercase tracking-wider mb-1">Provider</p>
              <p className="text-xs lg:text-sm font-medium text-[#E6F1FF] truncate">{certificate.issuer}</p>
            </div>
            
            {certificate.issueDate && (
              <div>
                <p className="text-[10px] font-semibold text-[#6B7A90] uppercase tracking-wider mb-1">Completion Date</p>
                <p className="text-xs lg:text-sm text-[#E6F1FF]">
                  {new Date(certificate.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                </p>
              </div>
            )}
          </div>

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="py-4 border-b border-[rgba(255,255,255,0.03)] flex-grow">
              <p className="text-[10px] font-semibold text-[#6B7A90] uppercase tracking-wider mb-2.5">Skills & Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] text-[#A9B4C7] bg-[#050B14] px-2 py-1 rounded border border-[rgba(255,255,255,0.03)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-5 mt-auto">
            {certificate.credentialUrl && (
              <a 
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] text-[#E6F1FF] border border-[rgba(255,255,255,0.08)] text-[13px] font-semibold rounded transition-colors"
              >
                View Official Credential <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );

  return createPortal(content, document.body);
}

function CertificateCard({ certificate, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group flex flex-col rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(0,229,255,0.12)] hover:border-[rgba(0,229,255,0.25)] hover:shadow-[0_8px_30px_rgba(0,229,255,0.08)] cursor-pointer overflow-hidden text-left"
    >
      <div className="relative w-full h-48 shrink-0 bg-[#071425] overflow-hidden border-b border-[rgba(0,229,255,0.12)]">
        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#050B14]/80 backdrop-blur-sm rounded-md border border-[rgba(0,229,255,0.12)]">
          <span className="text-[10px] font-bold text-[#E6F1FF] tracking-wider uppercase">
            {certificate.status || 'Verified'}
          </span>
        </div>

        {certificate.thumbnail ? (
          <img 
            src={certificate.thumbnail} 
            alt={certificate.title} 
            loading="lazy"
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#6B7A90] transition-transform duration-500 ease-out group-hover:scale-[1.015]">
            <Award className="w-12 h-12 opacity-30" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow px-5 py-4">
        <div className="mt-auto">
          <p className="text-xs font-semibold text-[#6B7A90] uppercase tracking-wider truncate">
            {certificate.issuer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificatesGrid() {
  const { data: certificates, isLoading, isError } = useCertificates();
  const [selectedId, setSelectedId] = useState(null);

  const sortedCertificates = useMemo(() => {
    if (!certificates) return [];
    const order = [
      'Oracle Certified Professional: Cloud Native Application Development',
      'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      'Back-End Development and APIs V8',
      'Introduction to Cybersecurity'
    ];
    return [...certificates].sort((a, b) => {
      let indexA = order.indexOf(a.title);
      let indexB = order.indexOf(b.title);
      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;
      return indexA - indexB;
    });
  }, [certificates]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <CertificateSkeleton key={i} />)}
      </div>
    );
  }

  if (isError || !certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 rounded-xl border border-dashed border-[rgba(0,229,255,0.12)] bg-[#071425]">
        <p className="text-sm text-[#6B7A90] font-medium">
          No certificates are available to display at the moment.
        </p>
      </div>
    );
  }

  const selectedCert = sortedCertificates.find(c => (c.id || c._id) === selectedId);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {sortedCertificates.map((cert) => {
          const id = cert.id || cert._id;
          return (
            <CertificateCard 
              key={id} 
              certificate={cert} 
              onClick={() => setSelectedId(id)}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateOverlay 
            certificate={selectedCert} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
