import { AudioEffectBox } from "./devices/audio-effects/audio-effects.types";
import { Compressor } from "./devices/audio-effects/compressor/compressor.types";
import { InstrumentBox } from "./devices/instruments/instruments.types";

export enum TrackType {
  Notes = "notes",
  Drums = "drums",
  Audio = "audio",
}

export type NotesTrack = {
  type: TrackType.Notes;
  trackId: string;
  instrumentBox?: InstrumentBox;
  audioEffectBoxes: Array<AudioEffectBox>;
  dispose: () => void;
};

export type DrumsTrack = {
  type: TrackType.Notes;
  trackId: string;
  instrumentBox?: InstrumentBox;
  audioEffectBoxes: Array<AudioEffectBox>;
  dispose: () => void;
};

export type AudioTrack = {
  type: TrackType.Notes;
  trackId: string;
  audioEffectBoxes: Array<AudioEffectBox>;
  dispose: () => void;
};

export type AnyTrack = NotesTrack;
