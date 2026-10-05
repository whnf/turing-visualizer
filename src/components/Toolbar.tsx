import { Link } from "@tanstack/react-router";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ThemeToggle } from "@/components/ThemeToggle";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDescription, setTitle } from "@/store/metaSlice";
import { selectPhaseCount, selectTokenCount } from "@/store/tableSlice";

export function Toolbar() {
  const dispatch = useAppDispatch();

  const title = useAppSelector((state) => state.meta.title);
  const description = useAppSelector((state) => state.meta.description);

  const handleTitleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
  };

  const phaseCount = useAppSelector(selectPhaseCount);
  const tokenCount = useAppSelector(selectTokenCount);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft /> Machines
          </Button>
        </Link>
        <Input
          key={title}
          defaultValue={title}
          onBlur={handleTitleChange}
          placeholder="Untitled machine"
        />
        <Button variant="outline" disabled>
          <Save /> Save
        </Button>
        <ThemeToggle />
      </div>
      <Input
        key={description}
        defaultValue={description}
        onBlur={handleDescriptionChange}
        placeholder={`${phaseCount} states, ${tokenCount} symbols`}
      />
    </div>
  );
}
