import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Controls } from "@/components/Controls";
import { Tape } from "@/components/Tape";
import { TransitionTable } from "@/components/TransitionTable";
import { AppendPhase, AppendToken } from "@/components/AppendButton";
import { TapeEditHint } from "@/components/TapeEditHint";
import { CurrentPhase } from "@/components/CurrentPhase";

function Machine() {
  return (
    <div className="container p-8 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft /> Machines
          </Button>
        </Link>
        <Input value="Untitled Machine 1" />
        <ThemeToggle />
      </div>
      <Card>
        <CardHeader className="border-b grid-cols-[1fr_auto_1fr]">
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
      <Card className="p-0 gap-0">
        <CardHeader className="p-4 items-center">
          <CardTitle>Transition function</CardTitle>
          <CardAction className="row-span-1 self-center flex gap-2">
            <AppendPhase />
            <AppendToken />
          </CardAction>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <TransitionTable />
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/machine")({
  component: Machine,
});
