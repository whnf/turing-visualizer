import { PhaseNameInput, TokenNameInput } from "@/components/table/NameInput";
import {
  MoveButton,
  NextPhaseSelect,
  NextTokenSelect,
} from "@/components/table/TransitionSelect";

import { selectPhases, selectTokens } from "@/redux/reducers/table";
import { useAppSelector } from "@/redux/store";

export function Table() {
  const phases = useAppSelector(selectPhases);
  const tokens = useAppSelector(selectTokens);

  return (
    <table className="w-full min-w-max">
      <thead>
        <tr>
          <th className="sticky left-0 z-10 h-10 bg-card">
            <div className="h-full content-center border text-muted-foreground dark:bg-input/30">
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
            <td className="sticky left-0 h-10 bg-card">
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
