"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AgentSwitcherProps {
  currentAgent: string;
  onAgentChange: (agent: string) => void;
}

export const AgentSwitcher: React.FC<AgentSwitcherProps> = ({
  currentAgent,
  onAgentChange,
}) => {
  return (
    <div className="flex flex-col">
      <Label>Select Agent:</Label>
      <RadioGroup defaultValue={currentAgent} onValueChange={onAgentChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="faq" id="r2" />
          <Label htmlFor="r2">FAQ Agent</Label>
        </div>
        {/* Add more agents as needed */}
      </RadioGroup>
    </div>
  );
};
