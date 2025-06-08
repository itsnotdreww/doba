
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Trophy, ArrowRight } from "lucide-react";

interface AIJudgingProps {
  audioBlob: Blob;
  onJudgingComplete: (results: JudgingResults) => void;
}

export interface JudgingResults {
  overallScore: number;
  categories: {
    flow: number;
    wordplay: number;
    creativity: number;
    delivery: number;
  };
  feedback: string;
  highlights: string[];
}

const AIJudging = ({ audioBlob, onJudgingComplete }: AIJudgingProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("Analyzing audio...");
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<JudgingResults | null>(null);

  useEffect(() => {
    simulateAIJudging();
  }, []);

  const simulateAIJudging = async () => {
    const stages = [
      "Analyzing audio quality...",
      "Detecting rhythm and flow...",
      "Evaluating wordplay and rhymes...",
      "Assessing creativity and style...",
      "Calculating final score...",
      "Generating feedback..."
    ];

    for (let i = 0; i < stages.length; i++) {
      setCurrentStage(stages[i]);
      setProgress((i + 1) * (100 / stages.length));
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }

    // Generate mock results (in a real app, this would call an AI service)
    const mockResults: JudgingResults = {
      overallScore: Math.floor(Math.random() * 3) + 7, // Score between 7-10
      categories: {
        flow: Math.floor(Math.random() * 3) + 7,
        wordplay: Math.floor(Math.random() * 3) + 6,
        creativity: Math.floor(Math.random() * 3) + 7,
        delivery: Math.floor(Math.random() * 3) + 6,
      },
      feedback: "Your freestyle shows strong potential with solid flow and rhythm. Your wordplay demonstrates creativity, and your delivery has confidence. Focus on developing more complex rhyme schemes and varying your cadence to reach the next level.",
      highlights: [
        "Consistent rhythm throughout",
        "Creative metaphors and wordplay",
        "Confident delivery style",
        "Good use of internal rhymes"
      ]
    };

    setResults(mockResults);
    setIsComplete(true);
  };

  const handleContinue = () => {
    if (results) {
      onJudgingComplete(results);
    }
  };

  if (!isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-primary/20 border border-primary/30 w-fit">
              <Zap className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-2xl gradient-text">AI Judge at Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-4">{currentStage}</p>
              <Progress value={progress} className="w-full h-3" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>🎤 Our AI is analyzing your freestyle...</p>
              <p>This usually takes 10-15 seconds</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-full bg-primary/20 border border-primary/30 w-fit">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl gradient-text">Judging Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold gradient-text mb-2">
              {results?.overallScore}/10
            </div>
            <p className="text-xl text-muted-foreground">Overall Score</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="text-2xl font-bold text-primary">{results?.categories.flow}/10</div>
              <div className="text-sm text-muted-foreground">Flow</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="text-2xl font-bold text-accent">{results?.categories.wordplay}/10</div>
              <div className="text-sm text-muted-foreground">Wordplay</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="text-2xl font-bold text-[hsl(120_100%_50%)]">{results?.categories.creativity}/10</div>
              <div className="text-sm text-muted-foreground">Creativity</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="text-2xl font-bold text-primary">{results?.categories.delivery}/10</div>
              <div className="text-sm text-muted-foreground">Delivery</div>
            </div>
          </div>

          <Button 
            onClick={handleContinue}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 text-lg font-semibold"
          >
            View Detailed Feedback
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIJudging;
