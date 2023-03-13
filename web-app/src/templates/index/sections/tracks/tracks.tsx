import { useExtraToken } from "@/components/ui-kit/core/extra-token";
import { useToken } from "@/components/ui-kit/core/token";
import { Track as TrackType } from "../../contexts/tracks/track.types";
import { usePlaybackContext } from "../../contexts/playback/playback-context";
import { useProjectContext } from "../../contexts/project/project-context";
import {
  MEASURE_WIDTH,
  NotesTrackSequence,
} from "./track/notes-sequence/notes-track-sequence";
import { PositionIndicator } from "./position-indicator/position-indicator";
import { Sequence } from "tone";
import { TrackIndicators } from "./track/channel/track-indicators";
import { useState } from "react";
import { Button } from "antd";
import { Add } from "@mui/icons-material";

export function Tracks() {
  const token = useToken();
  const extraToken = useExtraToken();
  const { project, lengthInSeconds } = useProjectContext();
  const playgroundContext = usePlaybackContext();

  const [trackIndicatorHeights, setTrackIndicatorHeights] = useState<{
    [trackId: string]: number;
  }>({});

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        overflowX: "auto",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "25%",
          borderRight: `1px solid ${token.colorText}`,
        }}
      >
        {project.tracks.map((track) => {
          if (track.type === TrackType.Type.Notes) {
            return (
              <TrackIndicators
                key={track.id}
                trackId={track.id}
                onHeightChange={(height) => {
                  if (height != null) {
                    setTrackIndicatorHeights((v) => {
                      return {
                        ...v,
                        [track.id]: height,
                      };
                    });
                  }
                }}
              />
            );
          } else {
            throw new Error();
          }
        })}
        <div
          style={{
            padding: token.paddingSM,
          }}
        >
          <Button
            size="large"
            type="dashed"
            style={{
              width: "100%",
            }}
            icon={<Add />}
          >
            Add Track
          </Button>
        </div>
      </div>
      {/* <div
        onClick={(e) => {
          const songSizeInPx = project.lengthInMeasures * MEASURE_WIDTH;
          const clickedPosition = e.nativeEvent.clientX;

          if (clickedPosition >= songSizeInPx) {
            playgroundContext.setPositionInSeconds(lengthInSeconds);
          } else {
            const percent = clickedPosition / songSizeInPx;

            playgroundContext.setPositionInSeconds(percent * lengthInSeconds);
          }
        }}
      >
        <PositionIndicator />
        {project.tracks.map((track) => {
          const trackHeight = trackIndicatorHeights[track.id];
          if (trackHeight == null) {
            return <></>;
          } else if (track.type === TrackType.Type.Notes) {
            return (
              <NotesTrackSequence
                trackHeight={trackHeight}
                key={track.id}
                trackId={track.id}
              />
            );
          } else {
            throw new Error();
          }
        })}
      </div> */}
    </div>
  );
}
