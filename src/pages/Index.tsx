
import { useState } from "react";
import Header from "@/components/Header";
import GameIntro from "@/components/GameIntro";
import RecordingInterface from "@/components/RecordingInterface";
import AIJudging from "@/components/AIJudging";
import Results from "@/components/Results";
import { JudgingResults } from "@/components/AIJudging";

type GameState = "intro" | "recording" | "judging" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [judgingResults, setJudgingResults] = useState<JudgingResults | null>(null);

  const handleStartGame = () => {
    setGameState("recording");
  };

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    setGameState("judging");
  };

  const handleJudgingComplete = (results: JudgingResults) => {
    setJudgingResults(results);
    setGameState("results");
  };

  const handlePlayAgain = () => {
    setGameState("intro");
    setAudioBlob(null);
    setJudgingResults(null);
  };

  const handleBackToGame = () => {
    setGameState("intro");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-8">
        {gameState === "intro" && (
          <GameIntro onStartGame={handleStartGame} />
        )}
        
        {gameState === "recording" && (
          <RecordingInterface 
            onRecordingComplete={handleRecordingComplete}
            onBack={handleBackToGame}
          />
        )}
        
        {gameState === "judging" && audioBlob && (
          <AIJudging 
            audioBlob={audioBlob}
            onJudgingComplete={handleJudgingComplete}
          />
        )}
        
        {gameState === "results" && judgingResults && (
          <Results 
            results={judgingResults}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
