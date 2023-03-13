import { Tone } from "@/logic/internals/vendors/tone";
import { InputNode } from "tone";

export enum InstrumentType {
  AnalogSynth = "instrument-1",
}

export type Instrument = {
  triggerAttack: (args: { y: number; time?: Tone.Unit.Time }) => void;
  triggerRelease: (args: { y: number; time?: Tone.Unit.Time }) => void;
  connect: (audioNode: InputNode) => void;
  dispose: () => void;
};

export type InstrumentBox = {
  type: string;
  isLoading: boolean;
  error?: { message: string };
  instrumentRef: Instrument;
};
