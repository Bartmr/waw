import { useExtraToken } from "@/components/ui-kit/core/extra-token";
import { useToken } from "@/components/ui-kit/core/token";
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
import { Button, Dropdown } from "antd";
import { Add } from "@mui/icons-material";
import { v1 } from "uuid";
import { TrackType } from "../../contexts/tracks/track.types";

export function Tracks() {
  const token = useToken();
  const extraToken = useExtraToken();
  const { project, lengthInSeconds, setProject } = useProjectContext();
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
          if (track.type === TrackType.Notes) {
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
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "notes",
                  label: "Notes track",
                  onClick: () => {
                    setProject({
                      ...project,
                      tracks: [
                        ...project.tracks,
                        {
                          type: TrackType.Notes,
                          id: v1(),
                          label: `Track ${project.tracks.length + 1 + 1}`,
                          notes: [],
                          instrument: undefined,
                          audioEffects: [],
                        },
                      ],
                    });
                  },
                },
              ],
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
          </Dropdown>
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
