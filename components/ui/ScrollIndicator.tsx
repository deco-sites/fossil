import Icon from "./Icon.tsx";

export interface ScrollIndicatorProps {
  text?: string;
  className?: string;
  theme?: "default" | "white";
  positioning?: "fixed" | "relative";
}

export default function ScrollIndicator({
  text = "Explore a coleção",
  className = "",
  theme = "default",
  positioning = "fixed",
}: ScrollIndicatorProps) {
  return (
    <>
      <style>
        {`
        @keyframes bounce {
          0% {
            transform: translate3d(0px, 0px, 0px);
          }
          50% {
            transform: translate3d(0px, 8px, 0px);
          }
        }
        
        .scroll-indicator-animate {
          animation: bounce 1s ease-in-out infinite;
        }
      `}
      </style>

      <div
        className={`${
          positioning === "fixed"
            ? "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            : "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        } ${className}`}
      >
        <div className="text-center">
          <p
            className={`mb-2 text-sm md:text-base font-soleil ${
              theme === "white" ? "text-white" : "text-base-content"
            }`}
          >
            {text}
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-sm transition-colors duration-200 scroll-indicator-animate border border-white">
              <Icon
                id="ChevronDown"
                width={20}
                height={20}
                className={theme === "white"
                  ? "text-white"
                  : "text-base-content"}
                alt="Scroll down indicator"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
