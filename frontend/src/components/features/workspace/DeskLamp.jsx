import React from 'react';
import { motion } from 'framer-motion';

export const DeskLamp = ({ isActive }) => {
  return (
    <div 
      className="absolute right-[1%] bottom-[8%] w-[28%] h-[65%] z-10 pointer-events-none flex flex-col items-end justify-end"
      style={{ transform: 'perspective(1000px) rotateY(-18deg) rotateX(8deg) translateZ(20px)' }}
    >
      {/* Dynamic Light Cone & Bloom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-[-140px] right-[calc(10%-80px)] w-[320px] h-[360px] pointer-events-none mix-blend-screen z-0"
      >
        {/* Core Beam */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/[0.08] via-[#00E5FF]/[0.02] to-transparent transform rotate-[68deg] origin-top blur-[15px]" 
          style={{ clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)' }} 
        />
        {/* Soft Ambient Spread */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/[0.04] to-transparent transform rotate-[65deg] origin-top blur-[40px]" 
          style={{ clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)' }} 
        />
      </motion.div>

      {/* Desk Surface Illumination (Falloff) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="absolute bottom-[-10px] right-[10%] w-[200px] h-[60px] bg-[#00E5FF]/[0.06] blur-[30px] rounded-[50%] pointer-events-none transform -rotate-[10deg] mix-blend-screen"
      />

      {/* Lamp Structure (Redesigned for better physical realism) */}
      
      {/* Base */}
      <div className="absolute bottom-[2px] right-[10%] w-[65px] h-[16px] bg-gradient-to-b from-[#1E293B] to-[#0F1423] rounded-[50%] border border-[rgba(0,229,255,0.25)] shadow-[0_20px_35px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)] z-10" />
      
      {/* Lower Arm Pivot */}
      <div className="absolute bottom-[10px] right-[calc(10%+25px)] w-[15px] h-[15px] rounded-full bg-gradient-to-br from-[#2A344A] to-[#0F1423] border border-[#00E5FF]/20 shadow-[0_5px_10px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center">
         <div className="w-[5px] h-[5px] rounded-full bg-[#050B14] border border-[#00E5FF]/30" />
      </div>

      {/* Lower Arm */}
      <div className="absolute bottom-[18px] right-[calc(10%+28.5px)] w-[8px] h-[100px] bg-gradient-to-r from-[#2A344A] via-[#1E293B] to-[#0F1423] transform -rotate-[12deg] origin-bottom border-x border-[#00E5FF]/15 z-10 shadow-[4px_4px_10px_rgba(0,0,0,0.5)]" />

      {/* Central Joint */}
      <div className="absolute bottom-[112px] right-[calc(10%+42px)] w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#2A344A] to-[#0F1423] border border-[#00E5FF]/20 shadow-[0_5px_15px_rgba(0,0,0,0.7)] z-20 flex items-center justify-center">
         <div className="w-[8px] h-[8px] rounded-full bg-[#050B14] border border-[#00E5FF]/30" />
         {/* Joint Accent Glow */}
         <motion.div animate={{ opacity: isActive ? 0.3 : 0 }} className="absolute inset-0 rounded-full bg-[#00E5FF] blur-[4px]" />
      </div>

      {/* Upper Arm */}
      <div className="absolute bottom-[122px] right-[calc(10%+46px)] w-[7px] h-[110px] bg-gradient-to-r from-[#2A344A] via-[#1E293B] to-[#0F1423] transform rotate-[42deg] origin-bottom border-x border-[#00E5FF]/15 z-10 shadow-[-4px_4px_10px_rgba(0,0,0,0.5)]" />

      {/* Head Joint */}
      <div className="absolute bottom-[196px] right-[calc(10%-25px)] w-[16px] h-[16px] rounded-full bg-gradient-to-br from-[#2A344A] to-[#0F1423] border border-[#00E5FF]/20 shadow-[0_5px_10px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center">
         <div className="w-[6px] h-[6px] rounded-full bg-[#050B14] border border-[#00E5FF]/30" />
      </div>

      {/* Lamp Head */}
      <div className="absolute bottom-[176px] right-[calc(10%-20px)] w-[65px] h-[52px] origin-right transform -rotate-[22deg] z-30 flex items-center justify-start">
         {/* Shade body */}
         <div className="absolute right-[4px] w-[54px] h-full bg-gradient-to-l from-[#1E293B] via-[#151B28] to-[#0A0F1A] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-[#00E5FF]/10" style={{ clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)' }} />
         
         {/* Shade Opening (Light Source) */}
         <div className="absolute left-[3px] w-[16px] h-[52px] rounded-[50%] bg-gradient-to-r from-[#050B14] to-[#1A2235] border-l-2 border-[#00E5FF]/60 flex items-center justify-center z-10 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] overflow-hidden relative">
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-[8px] h-[24px] rounded-full bg-[#FFFFFF] shadow-[0_0_15px_#00E5FF,0_0_30px_#FFFFFF]" 
             />
         </div>
         
         {/* Back Cap */}
         <div className="absolute right-[0px] w-[10px] h-[24px] rounded-full bg-gradient-to-b from-[#2A344A] to-[#0F1423] border border-[#00E5FF]/20 z-20 shadow-[3px_0_8px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
};
