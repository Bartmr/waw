import { InputNode } from "tone";

export enum AudioEffectType {
  Compressor = "audio-effect-1",
}

export type AudioEffect = {
  connect: (audioNode: InputNode) => void;
  dispose: () => void;
};

export type AudioEffectBox = {
  type: string;
  isLoading: boolean;
  error?: { message: string };
  audioEffectRef: AudioEffect;
};
