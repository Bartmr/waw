import { throwError } from "@/logic/internals/utils/throw-error";
import { useEffect, useState } from "react";
import { noteNameToY } from "../../contexts/project/notes/note-converters";
import { useSelectionContext } from "../../contexts/selection/selection-context";
import { SelectionType } from "../../contexts/selection/selection.enums";
import { useTracksContext } from "../../contexts/tracks/tracks-context";

const KEYBOARD_CODE_TO_PITCH: { [key: string]: string } = {
  KeyA: "C",
  KeyW: "C#",
  KeyS: "D",
  KeyE: "D#",
  KeyD: "E",
  KeyF: "F",
  KeyT: "F#",
  KeyG: "G",
  KeyY: "G#",
  KeyH: "A",
  KeyU: "A#",
  KeyJ: "B",
};

export function OnScreenKeyboard() {
  const [currentOctave, setCurrentOctave] = useState(4);

  const { selection } = useSelectionContext();

  useEffect(() => {
    setCurrentOctave(4);
  }, [selection]);

  const tracks = useTracksContext();

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }

      if (e.code === "KeyZ") {
        setCurrentOctave((o) => {
          const subtractedOctave = currentOctave - 1;

          if (subtractedOctave < 1) {
            return o;
          } else {
            return subtractedOctave;
          }
        });
      } else if (e.code === "KeyX") {
        setCurrentOctave((o) => {
          const addedOctave = currentOctave + 1;

          if (addedOctave > 8) {
            return o;
          } else {
            return addedOctave;
          }
        });
      } else {
        const pitch = KEYBOARD_CODE_TO_PITCH[e.code];

        if (selection.type === SelectionType.Track && pitch) {
          const track = tracks[selection.trackId] ?? throwError();

          if (track) {
            const instrument = track.instrumentBox?.instrumentRef;

            instrument?.triggerAttack({
              y: noteNameToY(pitch + currentOctave),
            });
          }
        }
      }
    };

    window.addEventListener("keydown", keydownListener);

    const keyupListener = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }

      const pitch = KEYBOARD_CODE_TO_PITCH[e.code];

      if (selection.type === SelectionType.Track && pitch) {
        const track = tracks[selection.trackId] ?? throwError();

        if (track) {
          const instrument = track.instrumentBox?.instrumentRef;

          pitch + currentOctave;

          instrument?.triggerRelease({
            y: noteNameToY(pitch + currentOctave),
          });
        }
      }
    };

    window.addEventListener("keyup", keyupListener);

    return () => {
      window.removeEventListener("keydown", keydownListener);
      window.removeEventListener("keyup", keyupListener);
    };
  }, [tracks, selection, currentOctave]);

  return <></>;
}
