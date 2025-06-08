
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Zap, Trophy, Clock } from "lucide-react";

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro = ({ onStartGame }: GameIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 gradient-text">
          Drop Your Bars
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Let AI judge your freestyle skills. Spit fire, get scored, level up.
        </p>
        <Button 
          onClick={onStartGame}
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold neon-glow"
        >
          <Mic className="w-5 h-5 mr-2" />
          Start Freestyle
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/20 border border-primary/30 w-fit">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-accent">Record Your Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Hit record and unleash your freestyle. No limits, just pure creativity.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="card-hover bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-accent/20 border border-accent/30 w-fit">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary">AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Our AI judges your flow, wordplay, creativity, and overall performance.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="card-hover bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-[hsl(120_100%_50%_/_0.2)] border border-[hsl(120_100%_50%_/_0.3)] w-fit">
              <Trophy className="w-6 h-6 text-[hsl(120_100%_50%)]" />
            </div>
            <CardTitle className="text-[hsl(120_100%_50%)]">Get Scored</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Receive detailed feedback and a score out of 10. Level up your skills!
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <CardTitle className="text-primary">How It Works</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">1</div>
              <p>Press record</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">2</div>
              <p>Freestyle for 30-60s</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[hsl(120_100%_50%)] mb-1">3</div>
              <p>AI analyzes your bars</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <p>Get your score & feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameIntro;
