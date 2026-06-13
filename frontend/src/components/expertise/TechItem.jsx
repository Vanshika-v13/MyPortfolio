import React from 'react';

export default function TechItem({ icon: Icon, name, label, className = '' }) {
  return (
    <div className={`group/item flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)] hover:scale-[1.02] ${className}`}>
      {Icon && (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-surface)] text-[var(--color-text-primary)] group-hover/item:text-[var(--color-accent)] transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-[var(--color-text-primary)] leading-tight">
          {name}
        </span>
        {label && (
          <span className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-tight">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
