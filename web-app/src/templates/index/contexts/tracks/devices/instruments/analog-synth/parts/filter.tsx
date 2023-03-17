import { DeepPartial } from "@/logic/internals/utils/types/deep-partial";
import { Tone } from "@/logic/internals/vendors/tone";
import { InputNode } from "tone";

export enum AnalogSynthFilterType {
  Lowpass = 1,
  Highpass = 2,
}

export type AnalogSynthFilterSettings = {
  filterType: AnalogSynthFilterType;
  // between 0 and 20 000 Hz
  filterCutoffFrequency: number;
  // between 0 and 1
  filterResonance: number;
};

export function createAnalogSynthFilter({}: {
  initialSettings: undefined | DeepPartial<AnalogSynthFilterSettings>;
}) {
  const filter = new Tone.BiquadFilter();

  return {
    getCutOffFrequency: () => filter.frequency.getValueAtTime(Tone.now()),
    setCutoffFrequency: (value: number) => {
      filter.frequency.setValueAtTime(value, Tone.now());
    },
    getResonance: () => filter.Q.getValueAtTime(Tone.now()),
    setResonance: (value: number) => {
      filter.Q.setValueAtTime(value, Tone.now());
    },
    getToneInstance: () => filter,
    connect: (node: InputNode) => filter.connect(node),
    dispose: () => {
      filter.dispose();
    },
  };
}
