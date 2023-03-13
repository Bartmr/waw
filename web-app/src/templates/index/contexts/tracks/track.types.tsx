import { AudioEffectBox } from "./devices/audio-effects/audio-effects.types";
import { Compressor } from "./devices/audio-effects/compressor/compressor.types";
import { InstrumentBox } from "./devices/instruments/instruments.types";

export namespace Track {
  export enum Type {
    Notes = "notes",
    Drums = "drums",
    Audio = "audio",
  }

  export type NotesTrack = {
    type: Track.Type.Notes;
    trackId: string;
    instrumentBox?: InstrumentBox;
    audioEffectBoxes: Array<AudioEffectBox>;
    dispose: () => void;
  };

  export type DrumsTrack = {
    type: Track.Type.Notes;
    trackId: string;
    instrumentBox?: InstrumentBox;
    audioEffectBoxes: Array<AudioEffectBox>;
    dispose: () => void;
  };

  export type AudioTrack = {
    type: Track.Type.Notes;
    trackId: string;
    audioEffectBoxes: Array<AudioEffectBox>;
    dispose: () => void;
  };

  export type AnyTrack = NotesTrack;
}
