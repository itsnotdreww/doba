
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface RecordingInterfaceProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onBack: () => void;
}

const RecordingInterface = ({ onRecordingComplete, onBack }: RecordingInterfaceProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast.success("Recording started! Drop your bars!");
    } catch (error) {
      toast.error("Failed to access microphone");
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast.success("Recording stopped!");
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const submitRecording = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        ← Back to Game
      </Button>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl gradient-text mb-2">
            {isRecording ? "Recording..." : audioBlob ? "Recording Complete" : "Ready to Record"}
          </CardTitle>
          <div className="text-2xl font-mono text-primary">
            {formatTime(recordingTime)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {!isRecording && !audioBlob && (
              <Button 
                onClick={startRecording}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold neon-glow"
              >
                <Mic className="w-6 h-6 mr-2" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <Button 
                onClick={stopRecording}
                size="lg"
                variant="destructive"
                className="px-8 py-6 text-lg font-semibold"
              >
                <Square className="w-6 h-6 mr-2" />
                Stop Recording
              </Button>
            )}

            {audioBlob && !isRecording && (
              <div className="flex gap-4">
                <Button 
                  onClick={playRecording}
                  variant="outline"
                  size="lg"
                  className="px-6 py-4"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Play
                </Button>
                <Button 
                  onClick={resetRecording}
                  variant="outline"
                  size="lg"
                  className="px-6 py-4"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={submitRecording}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-4 font-semibold"
                >
                  Submit for Judging
                </Button>
              </div>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>💡 <strong>Pro Tips:</strong></p>
            <p>• Keep it between 30-60 seconds</p>
            <p>• Focus on flow, wordplay, and creativity</p>
            <p>• Have fun and be yourself!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordingInterface;
