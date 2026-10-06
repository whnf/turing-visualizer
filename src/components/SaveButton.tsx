import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/store/hooks";
import { selectSavedMachine } from "@/store/selectors";
import { blankMachine, examples } from "@/lib/examples";
import { getMachine, saveMachine } from "@/lib/storage";

export function SaveButton() {
  const navigate = useNavigate();

  const machine = useAppSelector(selectSavedMachine);

  const original = machine.id ? getMachine(machine.id) : blankMachine;
  const saved = JSON.stringify(machine) === JSON.stringify(original);

  const handleSave = () => {
    const id = machine.id || nanoid();

    saveMachine({ ...machine, id, updatedAt: Date.now() });
    navigate({ to: "/machine/{-$id}", params: { id }, replace: true });
  };

  return (
    <Button
      variant="outline"
      onClick={handleSave}
      disabled={saved || machine.id in examples}
    >
      <Save /> Save
    </Button>
  );
}
