import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const subscribe = (onChange: () => void) => {
  const interval = setInterval(onChange, 1000);

  return () => clearInterval(interval);
};

const getSnapshot = () => JSON.stringify(Object.entries(localStorage));

const pretty = (value: string) => {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
};

export function StorageDebug() {
  const [open, setOpen] = useState(false);

  const entries: [string, string][] = JSON.parse(
    useSyncExternalStore(subscribe, getSnapshot),
  );

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="items-center p-4">
        <CardTitle>localStorage ({entries.length})</CardTitle>
        <CardAction className="row-span-1 flex gap-2 self-center">
          <Button variant="destructive" onClick={() => localStorage.clear()}>
            Clear storage
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardAction>
      </CardHeader>
      {open && (
        <CardContent className="border-t p-4 text-xs">
          {entries.map(([key, value]) => (
            <div key={key} className="mb-2">
              <div className="font-mono font-bold">{key}</div>
              <pre className="overflow-x-auto">{pretty(value)}</pre>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
