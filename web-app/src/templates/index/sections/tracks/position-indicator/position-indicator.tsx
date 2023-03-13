import { useToken } from "@/components/ui-kit/core/token";
import { throwError } from "@/logic/internals/utils/throw-error";
import { useEffect } from "react";
import { usePlaybackContext } from "../../../contexts/playback/playback-context";
import { useProjectContext } from "../../../contexts/project/project-context";
import { MEASURE_WIDTH } from "../track/notes-sequence/notes-track-sequence";

export function PositionIndicator() {
  const token = useToken();
  const { project } = useProjectContext();
  const playbackContext = usePlaybackContext();

  useEffect(() => {
    const unsubscribe = playbackContext.onPositionChange(
      ({ positionInMeasures }) => {
        console.log(positionInMeasures);
        (
          document.getElementById("position-indicator") ||
          (throwError() as HTMLDivElement)
        ).style.left = `${positionInMeasures * MEASURE_WIDTH}px`;
      }
    );

    return () => {
      unsubscribe();
    };
  }, [playbackContext]);

  return (
    <div
      id="position-indicator"
      style={{
        position: "absolute",
        top: 0,
        border: `2px solid ${token.colorPrimaryText}`,
        height: "100%",
        background: "red",
        transition: `left ${60 / project.bpm / 2}s`,
      }}
    >
      <div style={{}}></div>
    </div>
  );
}
