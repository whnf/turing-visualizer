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
        <tr>
          <th className="h-10 sticky left-0 z-10 bg-card">
            <div className="border h-full text-muted-foreground content-center dark:bg-input/30">
              State
            </div>
          </th>
          {tokens.map((token) => (
            <th key={token.id} className="h-10">
              <TokenNameInput token={token} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {phases.map((phase) => (
          <tr key={phase.id}>
            <td className="h-10 sticky left-0 bg-card">
              <PhaseNameInput phase={phase} />
            </td>
            {tokens.map((token) => (
              <td key={token.id} className="h-10">
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
