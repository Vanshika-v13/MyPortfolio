import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useCertificates } from '../../hooks/usePortfolioData';
import Modal from '../common/Modal';

function CertificateSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] overflow-hidden animate-pulse h-[320px]">
      <div className="w-full h-40 bg-[var(--color-surface-elevated)]"></div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div className="space-y-3">
          <div className="h-5 bg-[var(--color-surface-elevated)] rounded w-3/4"></div>
          <div className="h-4 bg-[var(--color-surface-elevated)] rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-[var(--color-surface-elevated)] rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );
}

function CertificateCard({ certificate, onClick, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.button
      onClick={() => onClick(certificate)}
      whileHover={{ x: 5 }}
      className={`group text-left flex flex-col md:flex-row w-full rounded-xl bg-transparent border-b border-t-0 border-x-0 border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] py-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="relative w-full md:w-1/3 h-48 bg-[rgba(0,0,0,0.2)] rounded-lg overflow-hidden shrink-0 border border-[rgba(255,255,255,0.03)]">
        {certificate.thumbnail ? (
          <img 
            src={certificate.thumbnail} 
            alt={certificate.title} 
            loading="lazy"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-secondary)] opacity-30">
            <Award className="w-12 h-12" />
          </div>
        )}
      </div>
      
      <div className={`flex flex-col flex-grow py-4 md:py-2 ${isEven ? 'md:pl-8' : 'md:pr-8 md:items-end md:text-right'}`}>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
          {certificate.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-base font-medium mb-4">
          {certificate.issuer}
        </p>
        <div className={`mt-auto flex items-center gap-6 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
          <span className="text-sm text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.03)] px-3 py-1 rounded-md border border-[rgba(255,255,255,0.05)]">
            {certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'No Date'}
          </span>
          <span className="text-sm font-medium text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View Details <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function CertificatesGrid() {
  const { data: certificates, isLoading, isError } = useCertificates();
  const [selectedCert, setSelectedCert] = useState(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <CertificateSkeleton key={i} />)}
      </div>
    );
  }

  if (isError || !certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 rounded-2xl border border-dashed border-[var(--color-surface-elevated)] bg-[var(--color-bg)]">
        <p className="text-lg text-[var(--color-text-secondary)] font-medium">
          No certificates are available to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {certificates.map((cert, index) => (
          <CertificateCard key={cert.id || cert._id} certificate={cert} index={index} onClick={setSelectedCert} />
        ))}
      </div>

      <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
        {selectedCert && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[var(--color-surface)] rounded-xl border border-[var(--color-surface-elevated)] overflow-hidden">
              {selectedCert.thumbnail ? (
                <img src={selectedCert.thumbnail} alt={selectedCert.title} className="max-w-full h-auto object-contain" />
              ) : (
                <div className="py-20 flex items-center justify-center text-[var(--color-text-secondary)]">
                  <Award className="w-24 h-24 opacity-20" />
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                {selectedCert.title}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                Issued by <span className="font-semibold text-[var(--color-text-primary)]">{selectedCert.issuer}</span>
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Issue Date</p>
                  <p className="text-[var(--color-text-primary)]">
                    {selectedCert.issueDate ? new Date(selectedCert.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                  </p>
                </div>
                {selectedCert.credentialId && (
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Credential ID</p>
                    <p className="text-[var(--color-text-primary)] font-mono text-sm">{selectedCert.credentialId}</p>
                  </div>
                )}
              </div>

              {selectedCert.credentialUrl && (
                <a 
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-full font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] w-fit"
                >
                  View Credential <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
