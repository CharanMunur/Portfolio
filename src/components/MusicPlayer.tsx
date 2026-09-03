import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const MusicBars = () => (
  <div className="flex items-end gap-[2px] h-3 w-4">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{
          height: ["20%", "100%", "20%"],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.2,
        }}
        className="w-[2px] bg-foreground/50 rounded-full"
      />
    ))}
  </div>
);

const MusicIcon = ({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="w-12 h-12 rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-all shadow-sm group"
    >
      <img
        src="/images/aruarian-dance.webp"
        alt="Aruarian Dance"
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isPlaying ? "scale-110" : "scale-100 group-hover:scale-105"
        }`}
      />
    </div>
  );
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-end pr-2">
      <audio
        ref={audioRef}
        src="/audio/aruarian-dance.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-2.5 pr-5 flex items-center gap-4 shadow-xl hover:border-border/80 transition-all group"
      >
        {/* Left: Album Art */}
        <MusicIcon isPlaying={isPlaying} onClick={togglePlay} />

        {/* Middle: Info */}
        <div className="flex flex-col min-w-[130px] justify-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-light tracking-tight text-foreground truncate">
              Aruarian Dance
            </span>
            {isPlaying && <MusicBars />}
          </div>
          <span className="text-[12px] text-muted-foreground font-light tracking-wide">
            Nujabes
          </span>
        </div>

        {/* Right: Controls */}
        <button
          onClick={togglePlay}
          className="ml-2 p-2.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all active:scale-90"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={18} className="fill-current" />
          ) : (
            <Play size={18} className="fill-current ml-0.5" />
          )}
        </button>
      </motion.div>
    </div>
  );
};
