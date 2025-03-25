
import { cn } from '@/lib/utils';

interface LoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const Loader = ({ isLoading, onComplete }: LoaderProps) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onTransitionEnd={() => {
        if (!isLoading && onComplete) {
          onComplete();
        }
      }}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-2 border-primary/70 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-4 border-t-2 border-primary/40 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
        <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
