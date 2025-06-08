
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, RotateCcw, Share } from "lucide-react";
import { JudgingResults } from "./AIJudging";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ResultsProps {
  results: JudgingResults;
  onPlayAgain: () => void;
}

const Results = ({ results, onPlayAgain }: ResultsProps) => {
  const [showCongratulations, setShowCongratulations] = useState(false);

  // Play congratulations sound and show popup for high scores
  useEffect(() => {
    if (results.overallScore > 8) {
      // Create a pleasant congratulations beep
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a sequence of pleasant tones
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Play a pleasant victory melody
      const now = audioContext.currentTime;
      playTone(523, now, 0.3); // C5
      playTone(659, now + 0.3, 0.3); // E5
      playTone(784, now + 0.6, 0.5); // G5

      setShowCongratulations(true);
    }
  }, [results.overallScore]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-[hsl(120_100%_50%)]";
    if (score >= 6) return "text-accent";
    return "text-primary";
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 9) return { level: "Battle Champion", emoji: "👑" };
    if (score >= 8) return { level: "Rap Warrior", emoji: "🔥" };
    if (score >= 7) return { level: "Strong Contender", emoji: "💪" };
    if (score >= 6) return { level: "Rising Star", emoji: "⭐" };
    return { level: "Keep Training", emoji: "🎯" };
  };

  const performance = getPerformanceLevel(results.overallScore);

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DOBA Battle Results',
        text: `I just scored ${results.overallScore}/10 in DOBA! ${performance.emoji}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`I just scored ${results.overallScore}/10 in DOBA! ${performance.emoji}`);
      toast.success("Battle results copied to clipboard!");
    }
  };

  return (
    <>
      <AlertDialog open={showCongratulations} onOpenChange={setShowCongratulations}>
        <AlertDialogContent className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl gradient-text">
              🎉 CONGRATULATIONS! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              Outstanding performance! You scored <strong>{results.overallScore}/10</strong> - that's elite level DOBA skills!
              <br />
              <span className="text-2xl mt-2 block">{performance.emoji} {performance.level} {performance.emoji}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowCongratulations(false)}>
              Amazing! Let's Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header with overall score */}
        <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-primary/20 border border-primary/30 w-fit">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">{performance.emoji}</span>
              <CardTitle className="text-4xl gradient-text">{performance.level}</CardTitle>
            </div>
            <div className="text-7xl font-bold gradient-text mb-2">
              {results.overallScore}/10
            </div>
          </CardHeader>
        </Card>

        {/* Category breakdown */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Battle Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className={`text-3xl font-bold ${getScoreColor(results.categories.flow)}`}>
                  {results.categories.flow}/10
                </div>
                <div className="text-lg font-semibold text-primary mb-1">Flow</div>
                <div className="text-sm text-muted-foreground">Rhythm & Timing</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                <div className={`text-3xl font-bold ${getScoreColor(results.categories.wordplay)}`}>
                  {results.categories.wordplay}/10
                </div>
                <div className="text-lg font-semibold text-accent mb-1">Wordplay</div>
                <div className="text-sm text-muted-foreground">Rhymes & Bars</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-[hsl(120_100%_50%_/_0.1)] to-[hsl(120_100%_50%_/_0.05)] border border-[hsl(120_100%_50%_/_0.2)]">
                <div className={`text-3xl font-bold ${getScoreColor(results.categories.creativity)}`}>
                  {results.categories.creativity}/10
                </div>
                <div className="text-lg font-semibold text-[hsl(120_100%_50%)] mb-1">Creativity</div>
                <div className="text-sm text-muted-foreground">Originality</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className={`text-3xl font-bold ${getScoreColor(results.categories.delivery)}`}>
                  {results.categories.delivery}/10
                </div>
                <div className="text-lg font-semibold text-primary mb-1">Delivery</div>
                <div className="text-sm text-muted-foreground">Style & Energy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Feedback */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Battle Judge Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {results.feedback}
            </p>
            
            <div>
              <h4 className="font-semibold mb-3 text-primary">Highlights:</h4>
              <div className="flex flex-wrap gap-2">
                {results.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onPlayAgain}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-semibold"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Battle
          </Button>
          
          <Button 
            onClick={shareResults}
            variant="outline"
            size="lg"
            className="px-8 py-4 font-semibold"
          >
            <Share className="w-5 h-5 mr-2" />
            Share Battle Results
          </Button>
        </div>
      </div>
    </>
  );
};

export default Results;
