import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

function QuoteCard() {
  // Split the text into individual letters
  const text = "Never Stop Exploring";
  const letters = text.split("");

  return (
    <Card className="col-span-6 row-span-2 p-8 border-none basecard relative">
      <CardContent className="flex items-end justify-center h-full">
        {/* Container for the animated text */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-5xl font-serif italic text-center  tracking-tighter"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }, // Ensure full opacity
              }}
              transition={{ delay: index * 0.08, duration: 0.4 }} // Adjust delay and duration
              className="inline-block" // Prevent unwanted spacing
            >
              {letter === " " ? "\u00A0" : letter} {/* Replace spaces with non-breaking space */}
            </motion.span>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}

export default QuoteCard;