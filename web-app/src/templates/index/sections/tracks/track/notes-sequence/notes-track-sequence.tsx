import { useToken } from "@/components/ui-kit/core/token";
import { Project } from "../../../../contexts/project/project.types";
import { useProjectContext } from "../../../../contexts/project/project-context";
import { throwError } from "@/logic/internals/utils/throw-error";
import { TrackType } from "@/templates/index/contexts/tracks/track.types";

export const MEASURE_WIDTH = 96;

function Note(props: {
  note: Project.Note;
  minY: number;
  maxY: number;
  trackHeight: number;
}) {
  const token = useToken();

  const interval = props.maxY - props.minY + 1;

  const positionInInterval = props.note.y - props.minY;

  return (
    <div
      style={{
        backgroundColor: token.colorTextTertiary,
        height: props.trackHeight / interval,
        position: "absolute",
        top: (positionInInterval * props.trackHeight) / interval,
        left: (MEASURE_WIDTH / 16) * props.note.startX,
        width: (MEASURE_WIDTH / 16) * (props.note.endX - props.note.startX + 1),
      }}
    />
  );
}

export function NotesTrackSequence(props: {
  trackId: string;
  trackHeight: number;
}) {
  const token = useToken();
  const { project } = useProjectContext();

  const track =
    project.tracks.find((track) => track.id === props.trackId) || throwError();
  if (track.type !== TrackType.Notes) {
    throw new Error();
  }
  const notes: Project.Note[] = track.notes;

  const minY = notes.reduce((minY, note) => (note.y < minY ? note.y : minY), 0);
  const maxY = notes.reduce((maxY, note) => (note.y > maxY ? note.y : maxY), 0);

  return (
    <div
      style={{
        height: `${props.trackHeight}px`,

        width: "100%",
        borderBottom: `1px solid ${token.colorBorder}`,
      }}
    >
      <div
        style={{
          borderRight: `1px solid ${token.colorBorder}`,

          width: `${project.lengthInMeasures * MEASURE_WIDTH}px`,
          position: "relative",
        }}
      >
        <div>
          {notes.map((note, i) => {
            return (
              <Note
                trackHeight={props.trackHeight}
                minY={minY}
                maxY={maxY}
                key={`key-${i}`}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
