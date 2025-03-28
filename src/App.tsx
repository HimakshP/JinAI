import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./components/WalletProvider";
import Index from "./pages/Index";
import GameRoom from "./pages/GameRoom";
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Login';
import { Container, Header, MessageList, Composer, ComposerInput, ComposerButton, WebchatProvider } from '@botpress/webchat';
import GameRoom1 from "./pages/GameRoom1";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <WalletContextProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game/1" element={<GameRoom />} />
            <Route path="/game/2" element={<GameRoom1 />} />

          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </WalletContextProvider>
  </BrowserRouter>
);

export default App;