"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { AgentSwitcher } from "@/components/AgentSwitcher";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentType, setAgentType] = useState<string>("default");
  const { toast } = useToast();

  useEffect(() => {
    const getInitialMessage = async () => {
      try {
        const response = await fetch('/api/generate-initial-message');
        if (!response.ok) {
          throw new Error(`Failed to fetch initial message: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMessages([{ text: data.message, sender: "bot" }]);
      } catch (error: any) {
        toast({
          title: "Error fetching initial message",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    getInitialMessage();
  }, [toast]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { text: text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/answer-user-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        throw new Error(`Failed to process message: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = { text: data.answer, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      toast({
        title: "Error processing message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAgentChange = (agent: string) => {
    setAgentType(agent);
    // Implement agent-specific logic here
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-secondary p-4 shadow-md">
        <h1 className="text-lg font-semibold">WhatsAssist</h1>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      </main>
      <footer className="p-4 border-t">
        <AgentSwitcher
          currentAgent={agentType}
          onAgentChange={handleAgentChange}
        />
      </footer>
    </div>
  );
}

type ChatMessage = {
  text: string;
  sender: "user" | "bot";
};
