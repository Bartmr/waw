import { DeepPartial } from "@/logic/internals/utils/types/deep-partial";
import { AnalogSynthSettings } from "../tracks/devices/instruments/analog-synth/analog-synth";
import { InstrumentType } from "../tracks/devices/instruments/instruments.types";
import { TrackType } from "../tracks/track.types";

export namespace Project {
  export type Note = {
    startX: number;
    endX: number;
    y: number;
  };

  export type Sequence = {
    measureCount: number;
    positionInMeasures: number;
  };

  export type AudioTrack = {
    type: TrackType.Audio;
    id: string;
    label: string;
  };

  export type DrumTrack = {
    type: TrackType.Drums;
    id: string;
    label: string;
  };

  export type NoteTrack = {
    type: TrackType.Notes;
    id: string;
    label: string;
    notes: Note[];
    instrument:
      | undefined
      | {
          type: InstrumentType.AnalogSynth;
          settings: DeepPartial<AnalogSynthSettings>;
        };
    audioEffects: Array<{ type: string }>;
  };

  export type AnyTrack = NoteTrack | DrumTrack | AudioTrack;

  export type Project = {
    bpm: number;
    lengthInMeasures: number;
    tracks: AnyTrack[];
  };
}
