import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AppendPhase, AppendToken } from "@/components/AppendButton";
import { Controls } from "@/components/Controls";
import { CurrentPhase } from "@/components/CurrentPhase";
import { StorageDebug } from "@/components/StorageDebug";
import { Tape } from "@/components/Tape";
import { TapeEditHint } from "@/components/TapeEditHint";
import { Toolbar } from "@/components/Toolbar";
import { TransitionTable } from "@/components/TransitionTable";

import { defaultMachine, examples } from "@/lib/examples";
import { getMachine } from "@/lib/storage";

import { loadMachine } from "@/store/actions";
import { store } from "@/store/store";

function Machine() {
  return (
    <div className="container flex flex-col gap-4 p-8">
      <Toolbar />
      <Card className="gap-0">
        <CardHeader className="grid-cols-[1fr_auto_1fr] border-b">
          <CardTitle>Tape</CardTitle>
          <CurrentPhase />
          <TapeEditHint />
        </CardHeader>
        <CardContent className="px-0">
          <Tape />
        </CardContent>
        <CardFooter>
          <Controls />
        </CardFooter>
      </Card>
      <Card className="gap-0 p-0">
        <CardHeader className="items-center p-4">
          <CardTitle>Transition function</CardTitle>
          <CardAction className="row-span-1 flex gap-2 self-center">
            <AppendPhase />
            <AppendToken />
          </CardAction>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <TransitionTable />
        </CardContent>
      </Card>
      {import.meta.env.DEV && <StorageDebug />}
    </div>
  );
}

export const Route = createFileRoute("/machine/{-$id}")({
  loader: ({ params: { id } }) => {
    const machine = id
      ? (getMachine(id) ?? examples[id] ?? defaultMachine)
      : defaultMachine;

    store.dispatch(loadMachine(machine));
  },
  component: Machine,
});
