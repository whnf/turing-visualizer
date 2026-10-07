import { ArrowDown, ArrowUp } from "lucide-react";

import { BLANK } from "@/lib/machine";
import { cn } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTokenById, selectTokens } from "@/store/tableSlice";
import {
  moveHead,
  selectPresent,
  selectStarted,
  writeInput,
} from "@/store/tapeSlice";

const CELL = 60;
const PITCH = CELL + 8;
const HALF = 40;

export function Tape() {
  const tokens = useAppSelector(selectTokens);

  const present = useAppSelector(selectPresent);
  const started = useAppSelector(selectStarted);
  const { head } = present;

  const dispatch = useAppDispatch();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
        dispatch(moveHead(head - 1));
        break;
      case "ArrowRight":
        dispatch(moveHead(head + 1));
        break;
      case "Backspace":
        dispatch(writeInput(BLANK));
        break;
      case "Delete":
      case " ":
        dispatch(writeInput(BLANK));
        break;
      default: {
        const token = tokens.find((t) => t.name === e.key);

        if (!token) {
          return;
        }

        dispatch(writeInput(token.id));
      }
    }

    e.preventDefault();
  };

  const indices = Array.from(
    { length: 2 * HALF + 1 },
    (_, k) => head - HALF + k,
  );

  return (
    <div
      tabIndex={0}
      data-tape
      onKeyDown={handleKeyDown}
      aria-label="Tape"
      className="group flex flex-col items-center gap-2 py-6 transition-colors duration-250 outline-none focus:bg-muted/50"
    >
      <ArrowDown className="stroke-1 text-muted-foreground transition-colors duration-250 group-focus:text-foreground" />
      <div className="relative h-12 w-full overflow-hidden mask-x-from-[calc(100%-6rem)]">
        <div
          className="absolute left-1/2 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(${-(head * PITCH + CELL / 2)}px)` }}
        >
          {indices.map((i) => (
            <Cell
              key={i}
              tokenId={present.cells[i] ?? BLANK}
              index={i}
              active={!started && i === head}
              style={{ left: i * PITCH }}
            />
          ))}
        </div>
      </div>
      <ArrowUp className="stroke-1 text-muted-foreground transition-colors duration-250 group-focus:text-foreground" />
    </div>
  );
}

function Cell({
  tokenId,
  index,
  active,
  style,
}: {
  tokenId: string;
  index: number;
  active: boolean;
  style: React.CSSProperties;
}) {
  const token = useAppSelector((s) => selectTokenById(s, tokenId));

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(moveHead(index));
  };

  return (
    <div
      onClick={handleClick}
      style={style}
      className={cn(
        "absolute flex h-12 w-15 items-center justify-center border transition-colors duration-250",
        active && "group-focus:border-primary group-focus:bg-accent",
      )}
    >
      {token?.name ?? "_"}
    </div>
  );
}
