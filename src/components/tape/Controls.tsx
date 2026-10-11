import { ButtonGroup } from "@/ui/button-group";

import { BackButton } from "@/components/tape/BackButton";
import { ResetButton } from "@/components/tape/ResetButton";
import { RunButton } from "@/components/tape/RunButton";
import { SpeedSlider } from "@/components/tape/SpeedSlider";
import { StepButton } from "@/components/tape/StepButton";
import { StepCount } from "@/components/tape/StepCount";

export function Controls() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center gap-4">
        <ResetButton />
        <StepCount />
      </div>
      <ButtonGroup className="flex flex-1 justify-center">
        <BackButton />
        <StepButton />
        <RunButton />
      </ButtonGroup>
      <div className="flex flex-1 items-center justify-end gap-4">
        <SpeedSlider />
      </div>
    </div>
  );
}
