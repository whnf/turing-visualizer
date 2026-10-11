import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import { StorageDebug } from "@/components/StorageDebug";
import { AppendPhase, AppendToken } from "@/components/table/AppendButton";
import { Table } from "@/components/table/Table";
import { Controls } from "@/components/tape/Controls";
import { CurrentPhase } from "@/components/tape/CurrentPhase";
import { EditHint } from "@/components/tape/EditHint";
import { Tape } from "@/components/tape/Tape";
import { Toolbar } from "@/components/toolbar/Toolbar";

import { defaultMachine, examples } from "@/lib/examples";
import { getMachine } from "@/lib/storage";

import { loadMachine } from "@/redux/actions";
import { store } from "@/redux/store";

function Machine() {
  return (
    <div className="container flex flex-col gap-4 p-8">
      <Toolbar />
      <Card className="gap-0">
        <CardHeader className="grid-cols-[1fr_auto_1fr] border-b">
          <CardTitle>Tape</CardTitle>
          <CurrentPhase />
          <EditHint />
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
          <Table />
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
