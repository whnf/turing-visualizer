import { useAppSelector } from "@/store/hooks";
import { selectPhases, selectTokens } from "@/store/tableSlice";
import { PhaseNameInput, TokenNameInput } from "@/components/NameInput";

import {
  NextPhaseSelect,
  NextTokenSelect,
  MoveButton,
} from "@/components/TransitionSelect";

export function TransitionTable() {
  const phases = useAppSelector(selectPhases);
  const tokens = useAppSelector(selectTokens);

  return (
    <table className="w-full min-w-max">
      <thead>
        <tr className="h-10">
          <th
            className="sticky left-0 bg-card"
            style={{ zIndex: tokens.length + 1 }}
          >
            <div className="border h-full text-muted-foreground content-center dark:bg-input/30">
              State
            </div>
          </th>
          {tokens.map((token, index) => (
            <th
              key={token.id}
              className="h-full relative last:[anchor-name:--last-token]"
              style={{ zIndex: tokens.length - index }}
            >
              <TokenNameInput token={token} index={index} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {phases.map((phase, index) => (
          <tr key={phase.id} className="h-10">
            <td
              className="h-full sticky left-0 bg-card"
              style={{ zIndex: phases.length - index }}
            >
              <PhaseNameInput phase={phase} index={index} />
            </td>
            {tokens.map((token) => (
              <td key={token.id} className="h-full">
                <div className="grid h-full grid-cols-[1fr_1fr_auto]">
                  <NextPhaseSelect phaseId={phase.id} tokenId={token.id} />
                  <NextTokenSelect phaseId={phase.id} tokenId={token.id} />
                  <MoveButton phaseId={phase.id} tokenId={token.id} />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
