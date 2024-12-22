import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const BotpressKeyInput = ({ onKeySet }: { onKeySet: () => void }) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('BOTPRESS_API_KEY', apiKey.trim());
      toast({
        title: "Success",
        description: "Botpress API key has been saved",
      });
      onKeySet();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jinblack via-jingold/20 to-jinblack text-white p-6 flex items-center justify-center">
      <div className="glass-card p-8 max-w-md w-full">
        <h2 className="jin-heading text-2xl mb-6 text-center">Enter Botpress API Key</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Botpress API key"
            className="w-full"
          />
          <Button type="submit" className="btn-connect w-full">
            Save API Key
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BotpressKeyInput;