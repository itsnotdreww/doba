
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Zap, Trophy, Clock, Users } from "lucide-react";

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro = ({ onStartGame }: GameIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 gradient-text">
          Battle for the Crown
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Compete against other rappers in DOBA - the ultimate freestyle battle arena. 
          Drop your bars, get scored by AI, and climb the leaderboard.
        </p>
        <Button 
          onClick={onStartGame}
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold neon-glow"
        >
          <Mic className="w-5 h-5 mr-2" />
          Start Battle
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/20 border border-primary/30 w-fit">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-accent">Multiplayer Battles</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Challenge friends or compete against players worldwide in freestyle rap battles.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="card-hover bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-accent/20 border border-accent/30 w-fit">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary">AI Judge</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Fair AI scoring system judges flow, wordplay, creativity, and delivery for every battle.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="card-hover bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-[hsl(120_100%_50%_/_0.2)] border border-[hsl(120_100%_50%_/_0.3)] w-fit">
              <Trophy className="w-6 h-6 text-[hsl(120_100%_50%)]" />
            </div>
            <CardTitle className="text-[hsl(120_100%_50%)]">Compete & Win</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Climb the leaderboard, earn respect, and prove you're the ultimate freestyle champion.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <CardTitle className="text-primary">How DOBA Works</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">1</div>
              <p>Join a battle</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">2</div>
              <p>Drop your freestyle</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[hsl(120_100%_50%)] mb-1">3</div>
              <p>AI scores all players</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4</div>
              <p>Winner takes the crown</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameIntro;
