import { ReactNode, useState } from "react";

interface FlipCardProps {
  childOne: ReactNode;
  childTwo?: ReactNode;
  rotateAxis?: "X" | "Y"; // Choose rotation axis
  animationStyle?: "ease" | "spring" | "linear"; // Choose animation style
  controlledFlip?: boolean; // If true, flipping is controlled externally
  isFlipped?: boolean; // External flip state
  onFlip?: (flipped: boolean) => void; // Callback when flip state changes
}

const FlipCard = ({
  childOne,
  childTwo,
  rotateAxis = "Y",
  animationStyle = "ease",
  controlledFlip = false,
  isFlipped = false,
  onFlip,
}: FlipCardProps) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const canFlip = Boolean(childTwo);

  // Final flip state (controlled or uncontrolled)
  const flipped = controlledFlip ? isFlipped : internalFlipped;

  // Handle flip on click
  const handleFlip = () => {
    if (canFlip) {
      if (controlledFlip) {
        onFlip?.(!flipped); // Notify parent if controlled
      } else {
        setInternalFlipped(!flipped);
      }
    }
  };

  // Set animation styles
  const animationClasses = {
    ease: "transition-transform duration-500 ease-in-out",
    spring: "transition-transform duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]",
    linear: "transition-transform duration-500 linear",
  };

  return (
    <div className="relative w-80 h-60 perspective-[1200px] cursor-pointer" onClick={handleFlip}>
      <div
        className={`relative w-full h-full [transform-style:preserve-3d] ${animationClasses[animationStyle]} ${
          flipped ? (rotateAxis === "X" ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]") : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
          {childOne}
        </div>

        {/* Back Side */}
        {canFlip && (
          <div
            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] ${
              rotateAxis === "X" ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]"
            }`}
          >
            {childTwo}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlipCard;
