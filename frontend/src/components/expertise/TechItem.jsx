import React from 'react';

export default function TechItem({ icon: Icon, iconColor, name, label, className = '' }) {
  return (
    <div className={`group/item flex items-center gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg transition-colors duration-200 border border-[rgba(255,255,255,0.03)] hover:border-[rgba(0,229,255,0.25)] bg-[rgba(255,255,255,0.02)] ${className}`}>
      {Icon && (
        <div 
          className="flex items-center justify-center shrink-0 w-4 h-4 md:w-5 md:h-5 text-[#A9B4C7] group-hover/item:text-[#00E5FF] transition-colors duration-200"
          style={{ color: iconColor || 'inherit' }}
        >
          <Icon className="w-full h-full" />
        </div>
      )}
      <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
        <span className="text-[11px] md:text-[13px] font-medium text-[#E6F1FF] leading-tight truncate">
          {name}
        </span>
        {label && (
          <span className="text-[9px] md:text-[10px] text-[#6B7A90] uppercase tracking-wider hidden sm:inline-block shrink-0">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
