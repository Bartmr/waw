import { useToken } from "@/components/ui-kit/core/token";
import { Tone } from "@/logic/internals/vendors/tone";
import { useToneStartContext } from "@/templates/index/contexts/tone-start/use-tone-start-context";
import { useTracksContext } from "@/templates/index/contexts/tracks/tracks-context";
import { NotesEditorGrid } from "./grid";
import { PianoRoll } from "./piano-roll";
import { NotesEditorToolbar } from "./toolbar";

export function NotesEditor() {
  const token = useToken();

  const toneStart = useToneStartContext();

  const trackInputs = useTracksContext();

  return (
    <div>
      <div>
        <NotesEditorToolbar />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            position: "sticky",
            left: 0,
          }}
        >
          <PianoRoll
            onAttack={async (y) => {
              if (!toneStart.hasStarted) {
                toneStart.start();
              }
              Object.values(
                trackInputs
              )[0]?.instrumentBox?.instrumentRef.triggerAttack({ y });
            }}
            onRelease={(y) => {
              Object.values(
                trackInputs
              )[0]?.instrumentBox?.instrumentRef.triggerRelease({ y });
            }}
          />
        </div>
        <div style={{ flex: "1 1 auto", minWidth: 0, overflow: "auto" }}>
          <NotesEditorGrid />
        </div>
      </div>
    </div>
  );
}
