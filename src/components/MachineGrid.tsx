import { Link, useRouter } from "@tanstack/react-router";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { deleteMachine, type SavedMachine } from "@/lib/storage";
import { timeAgo } from "@/lib/time";

export function MachineGrid({ machines }: { machines: SavedMachine[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}

function MachineCard({ machine }: { machine: SavedMachine }) {
  const router = useRouter();

  const updatedAt = new Date(machine.updatedAt);

  const handleDelete = () => {
    deleteMachine(machine.id);
    router.invalidate();
  };

  return (
    <Card className="relative h-full transition-colors hover:bg-muted has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring/50">
      <CardHeader>
        <CardTitle className="font-bold">
          <Link
            to="/machine/{-$id}"
            params={{ id: machine.id }}
            className="outline-none after:absolute after:inset-0"
          >
            {machine.title || "Untitled machine"}
          </Link>
        </CardTitle>
        <CardDescription>
          {machine.description ||
            `${machine.phases.length} states, ${machine.tokens.length} symbols`}
        </CardDescription>
      </CardHeader>
      {machine.updatedAt > 0 && (
        <CardFooter className="mt-auto text-muted-foreground">
          <time
            dateTime={updatedAt.toISOString()}
            title={updatedAt.toLocaleString()}
          >
            {timeAgo(machine.updatedAt)}
          </time>
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={handleDelete}
            aria-label="Delete machine"
            className="relative z-10 ml-auto opacity-0 group-focus-within/card:opacity-100 group-hover/card:opacity-100"
          >
            <Trash />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
