import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";

import { Button } from "@/ui/button";

import { examples } from "@/lib/examples";
import { defaultMachine } from "@/lib/machine";
import { loadMachine, saveMachine } from "@/lib/storage";

import { selectMachine } from "@/redux/selectors";
import { useAppSelector } from "@/redux/store";

export function SaveButton() {
  const navigate = useNavigate();

  const machine = useAppSelector(selectMachine);

  const original = machine.id ? loadMachine(machine.id) : defaultMachine;
  const saved = JSON.stringify(machine) === JSON.stringify(original);

  const handleClick = () => {
    const id = machine.id || nanoid();

    saveMachine({ ...machine, id, updatedAt: Date.now() });
    navigate({ to: "/machine/{-$id}", params: { id }, replace: true });
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={saved || machine.id in examples}
    >
      <Save /> Save
    </Button>
  );
}
