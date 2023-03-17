import { v1 } from "uuid";
import { Project } from "../../project/project.types";
import { createAnalogSynthInstrumentBox } from "../devices/instruments/analog-synth/analog-synth";
import {
  Instrument,
  InstrumentType,
} from "../devices/instruments/instruments.types";
import { NotesTrack, TrackType } from "../track.types";

export function createNotesTrack({
  trackInProject,
}: {
  trackInProject: Project.NoteTrack;
}): NotesTrack {
  if (!trackInProject.instrument) {
    return {
      type: TrackType.Notes,
      trackId: trackInProject.id,
      instrumentBox: undefined,
      audioEffectBoxes: [],
      dispose: () => {},
    };
  }
  if (trackInProject.instrument?.type === InstrumentType.AnalogSynth) {
    const instrumentBox = createAnalogSynthInstrumentBox({
      initialSettings: trackInProject.instrument.settings,
    });
    const audioEffectBoxes: Array<{ audioEffect: { dispose: () => void } }> =
      [];

    return {
      type: TrackType.Notes,
      trackId: trackInProject.id,
      instrumentBox,
      audioEffectBoxes: [],
      dispose: () => {
        instrumentBox.instrumentRef.dispose();

        for (const audioEffectBox of audioEffectBoxes) {
          audioEffectBox.audioEffect.dispose();
        }
      },
    };
  } else {
    throw new Error();
  }
}
