
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface BeatGeneratorProps {
  isPlaying: boolean;
  onBeatChange?: (beatIndex: number) => void;
}

const BeatGenerator = ({ isPlaying, onBeatChange }: BeatGeneratorProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [volume, setVolume] = useState([0.3]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  // Different beat patterns (kick, snare, hi-hat combinations)
  const beatPatterns = [
    [1, 0, 0, 1, 1, 0, 1, 0], // Basic boom-bap
    [1, 0, 1, 0, 1, 0, 1, 1], // Trap-style
    [1, 1, 0, 1, 0, 1, 0, 0], // Old school
    [1, 0, 0, 0, 1, 0, 1, 0], // Minimal
    [1, 1, 1, 0, 1, 0, 1, 1], // Heavy
  ];

  const generateRandomBeat = () => {
    const randomIndex = Math.floor(Math.random() * beatPatterns.length);
    setCurrentBeat(randomIndex);
    onBeatChange?.(randomIndex);
    return beatPatterns[randomIndex];
  };

  const playBeatSound = (intensity: number) => {
    if (!audioContextRef.current || isMuted) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    // Different frequencies for different drum sounds
    oscillator.frequency.setValueAtTime(
      intensity > 0.7 ? 60 : intensity > 0.3 ? 200 : 400, 
      audioContextRef.current.currentTime
    );
    
    oscillator.type = intensity > 0.7 ? 'sawtooth' : 'square';
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume[0] * intensity, 
      audioContextRef.current.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001, 
      audioContextRef.current.currentTime + 0.1
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  useEffect(() => {
    // Initialize Web Audio API
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const pattern = generateRandomBeat();
      let step = 0;
      
      intervalRef.current = setInterval(() => {
        const intensity = pattern[step % pattern.length];
        if (intensity) {
          playBeatSound(intensity);
        }
        step++;
      }, 250); // 240 BPM (4 beats per second)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <div className="w-20">
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Beat Pattern: {currentBeat + 1}
      </div>
      
      {isPlaying && (
        <div className="flex gap-1">
          {beatPatterns[currentBeat].map((beat, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                beat ? 'bg-primary animate-pulse' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BeatGenerator;
