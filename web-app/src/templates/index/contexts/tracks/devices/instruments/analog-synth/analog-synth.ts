import { DeepPartial } from "@/logic/internals/utils/types/deep-partial";
import { Tone } from "@/logic/internals/vendors/tone";
import { InputNode } from "tone";
import { InstrumentType } from "../instruments.types";
import {
  AnalogSynthAmplitudeEnvelopeSettings,
  createAnalogSynthAmplitudeEnvelope,
} from "./parts/amplitude-envelope";
import {
  AnalogSynthFilterSettings,
  createAnalogSynthFilter,
} from "./parts/filter";
import {
  AnalogSynthOscillatorsSettings,
  createAnalogSynthOscillatorsPool,
} from "./parts/oscillators";

export type AnalogSynthSettings = {
  oscillators: AnalogSynthOscillatorsSettings;
  filter: AnalogSynthFilterSettings;
  envelope: AnalogSynthAmplitudeEnvelopeSettings;
};

function createAnalogSynthInstrument({
  initialSettings,
}: {
  initialSettings: DeepPartial<AnalogSynthSettings>;
}) {
  const oscillatorsPool = createAnalogSynthOscillatorsPool({
    initialSettings: initialSettings.oscillators,
  });

  const filter = createAnalogSynthFilter({
    initialSettings: initialSettings.filter,
  });

  const envelope = createAnalogSynthAmplitudeEnvelope({
    initialSettings: initialSettings.envelope,
  });

  filter.connect(envelope.getToneInstance());

  return {
    connect: (inputNode: InputNode) => {
      envelope.connect(inputNode);
    },
    dispose: () => {
      oscillatorsPool.dispose();
      filter.dispose();
    },
    triggerAttack: ({ y, time }: { y: number; time?: Tone.Unit.Time }) => {
      oscillatorsPool.triggerAttack({ y, filter: filter.getToneInstance() });
      envelope.triggerAttack();
    },
    triggerRelease: ({ y, time }: { y: number; time?: Tone.Unit.Time }) => {
      oscillatorsPool.triggerRelease({ y, release: envelope.getReleaseTime() });
      envelope.triggerRelease();
    },
  };
}

export type AnalogSynthInstrumentBox = {
  type: InstrumentType.AnalogSynth;
  isLoading: boolean;
  error?: { message: string };
  instrumentRef: ReturnType<typeof createAnalogSynthInstrument>;
};

export function createAnalogSynthInstrumentBox({
  initialSettings,
}: {
  initialSettings: DeepPartial<AnalogSynthSettings>;
}): AnalogSynthInstrumentBox {
  return {
    type: InstrumentType.AnalogSynth,
    isLoading: false,
    error: undefined,
    instrumentRef: createAnalogSynthInstrument({ initialSettings }),
  };
}
