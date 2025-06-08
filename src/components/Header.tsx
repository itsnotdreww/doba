
import { Mic, Music } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-border/20">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
            <Music className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">
            DOBA
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mic className="w-4 h-4" />
          <span>Battle for rap supremacy</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
