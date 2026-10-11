import { Link, useRouter } from "@tanstack/react-router";
import { formatDistanceToNowStrict } from "date-fns";
import { Trash } from "lucide-react";

import { Button } from "@/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import type { SavedMachine } from "@/lib/machine";
import { deleteMachine } from "@/lib/storage";

export function MachineCard({ machine }: { machine: SavedMachine }) {
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
        <CardFooter className="mt-auto py-2 text-muted-foreground">
          <time
            dateTime={updatedAt.toISOString()}
            title={updatedAt.toLocaleString()}
          >
            {formatDistanceToNowStrict(machine.updatedAt, { addSuffix: true })}
          </time>
          <Button
            variant="destructive"
            size="icon-xs"
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
