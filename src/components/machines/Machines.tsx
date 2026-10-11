import { MachineCard } from "@/components/machines/MachineCard";

import type { SavedMachine } from "@/lib/machine";

export function Machines({ machines }: { machines: SavedMachine[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}
