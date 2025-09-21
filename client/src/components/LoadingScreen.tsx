import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center glassmorphism-strong"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <svg
          className="heart w-64 h-16 mx-auto mb-8"
          viewBox="-5 -5 278 56"
          version="1.1"
          id="svg5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="blur">
            <feGaussianBlur stdDeviation="1.6"></feGaussianBlur>
          </filter>
          <g transform="translate(29.1 -127.42)" id="layer1">
            <path
              pathLength="1"
              d="M-28.73 167.2c26.43 9.21 68.46-9.46 85.45-12.03 18.45-2.78 32.82 4.86 28.75 9.83-3.82 4.66-25.77-21.18-14.81-31.5 9.54-8.98 17.64 10.64 16.42 17.06-1.51-6.2 2.95-26.6 14.74-22.11 11.7 4.46-4.33 49.03-15.44 44.08-6.97-3.1 15.44-16.26 26.1-16 23.03.56 55.6 27.51 126.63 3.36"
              id="line"
            ></path>
          </g>
          <g transform="translate(29.1 -127.42)" id="layer2">
            <path
              pathLength="1"
              d="M-28.73 167.2c26.43 9.21 68.46-9.46 85.45-12.03 18.45-2.78 32.82 4.86 28.75 9.83-3.82 4.66-25.77-21.18-14.81-31.5 9.54-8.98 17.64 10.64 16.42 17.06-1.51-6.2 2.95-26.6 14.74-22.11 11.7 4.46-4.33 49.03-15.44 44.08-6.97-3.1 15.44-16.26 26.1-16 23.03.56 55.6 27.51 126.63 3.36"
              id="point"
              filter="url(#blur)"
            ></path>
          </g>
        </svg>
        
        <h2 className="text-2xl font-light text-foreground mb-2">Loading Your Memories</h2>
        <p className="text-muted-foreground">Just a moment...</p>
      </div>
    </motion.div>
  );
}