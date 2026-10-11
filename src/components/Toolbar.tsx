import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import { SaveButton } from "@/components/SaveButton";
import { ThemeToggle } from "@/components/ThemeToggle";

import {
  selectDescription,
  selectTitle,
  setDescription,
  setTitle,
} from "@/redux/reducers/meta";
import { selectPhaseCount, selectTokenCount } from "@/redux/reducers/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function Toolbar() {
  const dispatch = useAppDispatch();

  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const phaseCount = useAppSelector(selectPhaseCount);
  const tokenCount = useAppSelector(selectTokenCount);

  const handleTitleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
  };

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
        <SaveButton />
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
