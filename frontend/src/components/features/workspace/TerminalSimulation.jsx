import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sequence = [
  { text: "npm run dev", type: "command", color: "text-[#00E5FF]" },
  { text: "Server Running ✓", type: "success", color: "text-[#4DA3FF]" },
  { text: "MongoDB Connected ✓", type: "success", color: "text-[#4CFF88]" },
  { text: "Redis Cache Hit ✓", type: "success", color: "text-[#4CFF88]" },
  { text: "JWT Verified ✓", type: "success", color: "text-[#4CFF88]" },
  { text: "API Response 200 OK ✓", type: "success", color: "text-[#4CFF88]" },
  { text: "Watching for changes...", type: "info", color: "text-[#A9B4C7]" }
];

const randomStatusUpdates = [
  { text: "[Router] Hot reloaded /api/users", color: "text-[#A9B4C7]" },
  { text: "[DB] Query executed in 12ms", color: "text-[#A9B4C7]" },
  { text: "[Cache] Key updated successfully", color: "text-[#A9B4C7]" },
  { text: "[Auth] Token refreshed", color: "text-[#A9B4C7]" },
  { text: "[Sys] Memory usage stable", color: "text-[#A9B4C7]" }
];

export const TerminalSimulation = ({ isActive }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, charIndex]);

  useEffect(() => {
    if (!isActive) return;

    if (lineIndex >= sequence.length) {
      // Random updates when idle
      const timeout = setTimeout(() => {
        const randomUpdate = randomStatusUpdates[Math.floor(Math.random() * randomStatusUpdates.length)];
        setLines(prev => {
          const newLines = [...prev, randomUpdate];
          if (newLines.length > 15) newLines.shift(); // Keep logs scrolling
          return newLines;
        });
        window.dispatchEvent(new CustomEvent('terminal-keypress')); // Flash key for random update
      }, Math.random() * 4000 + 2000);
      return () => clearTimeout(timeout);
    }

    const currentItem = sequence[lineIndex];

    if (currentItem.type === "command") {
      if (charIndex < currentItem.text.length) {
        const timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
          window.dispatchEvent(new CustomEvent('terminal-keypress'));
        }, Math.random() * 40 + 20); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLines((prev) => [...prev, currentItem]);
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
          window.dispatchEvent(new CustomEvent('terminal-enterpress'));
        }, 400);
        return () => clearTimeout(timeout);
      }
    } else {
      // Fast output for logs
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentItem]);
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, Math.random() * 200 + 100);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex, isActive]);

  const currentItem = sequence[lineIndex];
  const isCommand = currentItem?.type === "command";
  const currentText = isCommand ? currentItem.text.substring(0, charIndex) : '';

  return (
    <div 
      ref={terminalRef}
      className="font-mono text-[9px] sm:text-[10px] md:text-[11px] leading-[1.6] flex flex-col text-left w-full h-full tracking-tight overflow-hidden scroll-smooth"
    >
      <AnimatePresence>
        {lines.map((line, i) => (
          <motion.div 
            key={`${i}-${line.text}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${line.color} flex items-center gap-1.5`}
          >
            {line.type === "command" ? <span className="text-[#00E5FF]">{'>'}</span> : null}
            {line.text}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isActive && lineIndex < sequence.length && isCommand && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[#00E5FF]">{'>'}</span>
          <span className={currentItem.color}>
            {currentText}
          </span>
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-1.5 h-3 bg-[#00E5FF] ml-0.5"
          />
        </div>
      )}
      
      {isActive && lineIndex >= sequence.length && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[#00E5FF] opacity-50">{'>'}</span>
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-1.5 h-3 bg-[#00E5FF] ml-0.5"
          />
        </div>
      )}
    </div>
  );
};
