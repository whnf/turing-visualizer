import { nanoid } from "@reduxjs/toolkit";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/store/hooks";
import { selectSavedMachine } from "@/store/selectors";
import { getMachine, saveMachine } from "@/lib/storage";

export function SaveButton() {
  const machine = useAppSelector(selectSavedMachine);

  const saved =
    JSON.stringify(machine) === JSON.stringify(getMachine(machine.id));

  const handleSave = () => {
    saveMachine({
      ...machine,
      id: machine.id || nanoid(),
      updatedAt: Date.now(),
    });
  };

  return (
    <Button variant="outline" onClick={handleSave} disabled>
      <Save /> Save
    </Button>
  );
}
