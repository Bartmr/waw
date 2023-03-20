import { useToken } from "@/components/ui-kit/core/token";
import { throwError } from "@/logic/internals/utils/throw-error";
import { useSelectionContext } from "@/templates/index/contexts/selection/selection-context";
import { SelectionType } from "@/templates/index/contexts/selection/selection.enums";
import { InstrumentType } from "@/templates/index/contexts/tracks/devices/instruments/instruments.types";
import { TrackType } from "@/templates/index/contexts/tracks/track.types";
import { useTracksContext } from "@/templates/index/contexts/tracks/tracks-context";
import useSelection from "antd/es/table/hooks/useSelection";
import { AnalogSynthDashboard } from "./instruments/analog-synth/dashboard/analog-synth-dashboard";

export function DevicesEditor() {
  const token = useToken();
  const tracks = useTracksContext();
  const { selection } = useSelectionContext();

  if (selection.type !== SelectionType.Track) {
    return null;
  }

  const track = tracks[selection.trackId] || throwError();

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      {track.instrumentBox ? (
        <div
          style={{
            padding: token.padding,
            borderRight: `1px solid ${token.colorText}`,
          }}
        >
          {(() => {
            if (track.instrumentBox.type === InstrumentType.AnalogSynth) {
              return <AnalogSynthDashboard />;
            } else {
              throw new Error();
            }
          })()}
        </div>
      ) : null}
    </div>
  );
}
