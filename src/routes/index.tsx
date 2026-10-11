import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";

import { Machines } from "@/components/machines/Machines";
import { StorageDebug } from "@/components/StorageDebug";
import { ThemeToggle } from "@/components/ThemeToggle";

import { examples } from "@/lib/examples";
import { loadMachines } from "@/lib/storage";

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
          <Machines machines={machines} />
        )}
      </section>
      <div className="flex items-center text-xs text-muted-foreground">
        EXAMPLES <Separator className="ml-2 shrink" />
      </div>
      <section className="py-6">
        <Machines machines={Object.values(examples)} />
      </section>
      {import.meta.env.DEV && <StorageDebug />}
    </div>
  );
}

export const Route = createFileRoute("/")({
  loader: () => loadMachines(),
  component: Home,
});
