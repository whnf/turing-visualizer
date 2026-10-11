import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/ui/button";

import { ThemeToggle } from "@/components/ThemeToggle";
import { DescriptionInput } from "@/components/toolbar/DescriptionInput";
import { SaveButton } from "@/components/toolbar/SaveButton";
import { TitleInput } from "@/components/toolbar/TitleInput";

export function Toolbar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft /> Machines
          </Button>
        </Link>
        <TitleInput />
        <SaveButton />
        <ThemeToggle />
      </div>
      <DescriptionInput />
    </div>
  );
}
