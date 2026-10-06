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

import { StorageDebug } from "@/components/StorageDebug";
import { ThemeToggle } from "@/components/ThemeToggle";

import { examples } from "@/lib/examples";
import { listMachines } from "@/lib/storage";

function Home() {
  const machines = Route.useLoaderData();

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
        {machines.length === 0 ? (
          <div className="border border-dashed p-4 text-xs text-muted-foreground">
            Nothing here yet. Machines you create are saved in this browser.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
            {machines.map((machine) => (
              <Link
                key={machine.id}
                to="/machine/{-$id}"
                params={{ id: machine.id }}
              >
                <Card className="h-full transition-colors hover:bg-muted">
                  <CardHeader>
                    <CardTitle className="font-bold">
                      {machine.title || "Untitled machine"}
                    </CardTitle>
                    <CardDescription>
                      {machine.description ||
                        `${machine.phases.length} states, ${machine.tokens.length} symbols`}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
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
  loader: () => listMachines(),
  component: Home,
});
