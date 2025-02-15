import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

function QuoteCard() {
  const text = "Never Stop Exploring, Always be curious. Keep questioning everything!";
  
  // Group words into chunks of 3-4 words per line
  const wordsArray = text.split(" ");
  const chunkSize = 4; // Number of words per line
  const wordChunks = [];
  
  for (let i = 0; i < wordsArray.length; i += chunkSize) {
    wordChunks.push(wordsArray.slice(i, i + chunkSize).join(" "));
  }

  return (
    <Card className="col-span-6 row-span-2 p-8 border-none basecard_color_primary relative">
      <CardContent className="flex items-end justify-center h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-start italic font-serif tracking-tight leading-snug w-full"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", whiteSpace: "pre-wrap" }} // Prevents word breaking
        >
          {wordChunks.map((chunk, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              className="mb-2" // Adds spacing between lines
            >
              {chunk}
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}

export default QuoteCard;
