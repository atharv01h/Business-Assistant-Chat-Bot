import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { CREATOR_INFO } from '../constants/creator';

export function Footer() {
  return (
    <footer className="relative w-full py-3 px-4 border-t border-gray-800 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Creator Info & Social */}
          <div className="flex items-center gap-4">
            <motion.a
              href={CREATOR_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-900/30 rounded-full text-purple-400 hover:bg-purple-900/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={16} />
              <span className="text-xs">Follow Creator</span>
              <ExternalLink size={12} />
            </motion.a>
          </div>

          {/* Copyright */}
          <motion.div
            className="flex items-center gap-2 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            <span>by {CREATOR_INFO.name}</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
    </footer>
  );
}