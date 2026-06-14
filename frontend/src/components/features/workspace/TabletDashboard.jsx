import React from 'react';

export const TabletDashboard = () => (
  <div className="flex flex-col w-full h-full p-1.5 md:p-2 bg-[#050B14]/90 rounded-[4px] text-[4.5px] md:text-[5.5px] font-sans text-[#A9B4C7] gap-1.5">
    <div className="flex justify-between items-center pb-1 border-b border-[rgba(0,229,255,0.12)]">
      <span className="text-[#E6F1FF] font-bold">System Architecture</span>
      <span className="flex items-center gap-1 text-[#4CFF88]"><span className="w-1 h-1 rounded-full bg-[#4CFF88] animate-pulse"></span> Live</span>
    </div>

    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">API Health</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#4CFF88] flex items-center gap-1"><span className="w-0.5 h-0.5 rounded-full bg-[#4CFF88]"></span> Online</span>
          <span className="opacity-80">99.9% Uptime</span>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Database</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#E6F1FF]">MongoDB</span>
          <span className="text-[#4CFF88]">Connected ✓</span>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Cache Layer</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#4DA3FF]">Redis Active</span>
          <span className="opacity-80">92% Hit Rate</span>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Authentication</span>
        <div className="flex flex-col gap-0.5 justify-center h-full">
          <span className="text-[#FFD166] flex items-center gap-1">
            <svg width="5" height="5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.09-.59 2.04-1.46 2.56L15 17h-6l1.46-4.44C9.59 12.04 9 11.09 9 10c0-1.66 1.34-3 3-3z"/></svg>
            JWT Secured
          </span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)]">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Server</span>
        <span className="text-[#4DA3FF]">Express Running</span>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)]">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Deployment</span>
        <span className="text-[#4CFF88]">Prod Ready</span>
      </div>
    </div>

    <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)]">
      <span className="text-[#00E5FF] font-semibold block mb-1 tracking-wide">Active Services</span>
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between items-center"><span className="text-[#E6F1FF]">Weather API</span><span className="text-[#4CFF88]">●</span></div>
        <div className="flex justify-between items-center"><span className="text-[#E6F1FF]">E-Commerce API</span><span className="text-[#4CFF88]">●</span></div>
        <div className="flex justify-between items-center"><span className="text-[#E6F1FF]">Portfolio API</span><span className="text-[#4CFF88]">●</span></div>
      </div>
    </div>

    <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] flex justify-between items-center mt-auto">
      <div className="flex flex-col">
        <span className="text-[#00E5FF] font-semibold tracking-wide">Git Status</span>
        <span className="opacity-80">Last Commit: Successful</span>
      </div>
      <div className="flex items-center gap-0.5 text-[#E6F1FF] bg-[#1A2235] px-1 py-0.5 rounded-[2px] border border-[#2A344A]">
        <svg width="4" height="4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5l7-7-1.41-1.41L10 11.67l-2.59-2.58L6 10.5l4 4z"/></svg>
        main
      </div>
    </div>
  </div>
);
