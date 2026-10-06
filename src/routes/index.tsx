import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";

import { StorageDebug } from "@/components/StorageDebug";

import { examples } from "@/lib/examples";

const defined = [
  { title: "Untitled machine 1", description: "2 states, 2 symbols" },
];

function Home() {
  return (
    <div className="container p-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Turing Machine Visualizer</h1>
          <h2 className="text-muted-foreground">
            Pick a machine to run, or start one from scratch
          </h2>
        </div>
        <ThemeToggle />
      </div>
      <section className="py-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Your machines</h3>
          <Link to="/machine/{-$id}">
            <Button size="lg">
              <PlusIcon /> New machine
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
          {defined.map((machine, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="font-bold">{machine.title}</CardTitle>
                <CardDescription>{machine.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <div className="flex items-center text-xs text-muted-foreground">
        EXAMPLES <Separator className="ml-2 shrink" />
      </div>
      <section className="py-6">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
          {Object.values(examples).map((example) => (
            <Link
              key={example.id}
              to="/machine/{-$id}"
              params={{ id: example.id }}
            >
              <Card className="h-full transition-colors hover:bg-muted">
                <CardHeader>
                  <CardTitle className="font-bold">{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      {import.meta.env.DEV && <StorageDebug />}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Home,
});
