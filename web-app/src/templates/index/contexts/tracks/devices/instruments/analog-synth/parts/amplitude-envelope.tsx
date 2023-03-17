import { DeepPartial } from "@/logic/internals/utils/types/deep-partial";
import { Tone } from "@/logic/internals/vendors/tone";
import { InputNode } from "tone";

export type AnalogSynthAmplitudeEnvelopeSettings = {
  // between 0 and 2 seconds
  attack: number;
  // between 0 and 2 seconds
  decay: number;
  // between 0 and 1
  sustain: number;
  // between 0 and 5 seconds
  release: number;
};

export function createAnalogSynthAmplitudeEnvelope({
  initialSettings,
}: {
  initialSettings:
    | undefined
    | DeepPartial<AnalogSynthAmplitudeEnvelopeSettings>;
}) {
  const envelope = new Tone.AmplitudeEnvelope({
    attack: initialSettings?.attack ?? 0,
    decay: initialSettings?.decay ?? 0,
    sustain: initialSettings?.sustain ?? 1,
    release: initialSettings?.release ?? 0,
  });

  return {
    getAttack: () => envelope.attack,
    setAttack: (value: number) => {
      envelope.attack = value;
    },
    getDecay: () => envelope.decay,
    setDecay: (value: number) => {
      envelope.decay = value;
    },
    getSustain: () => envelope.sustain,
    setSustain: (value: number) => {
      envelope.sustain = value;
    },
    getRelease: () => envelope.release,
    setRelease: (value: number) => {
      envelope.release = value;
    },
    getToneInstance: () => envelope,
    connect: (inputNode: InputNode) => envelope.connect(inputNode),
    dispose: () => {
      envelope.dispose();
    },
    getReleaseTime: () => envelope.release,
    triggerAttack: () => {
      envelope.triggerAttack(0);
    },
    triggerRelease: () => {
      envelope.triggerRelease(0);
    },
  };
}
