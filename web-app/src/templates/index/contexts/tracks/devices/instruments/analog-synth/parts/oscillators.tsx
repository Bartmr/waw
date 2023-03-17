import { throwError } from "@/logic/internals/utils/throw-error";
import { DeepPartial } from "@/logic/internals/utils/types/deep-partial";
import { Tone } from "@/logic/internals/vendors/tone";
import {
  octaveAndRemainderCentsToTotalCents,
  totalCentsToOctaveAndRemainderCents,
  yToNoteName,
} from "@/templates/index/contexts/project/notes/note-converters";

export enum AnalogSynthOscillatorShape {
  Triangle = "triangle",
  Square = "square",
  Sawtooth = "sawtooth",
}

type OscillatorSettings = {
  shape: AnalogSynthOscillatorShape;
  /*
      -4 to 4 octaves
    */
  detuneOctaves: number;
  /*
      -600 to 600 cents, equivalent to 12 semitones
      from half the previous octave to the half of the next octave 
    */
  detuneCents: number;
  /*
      From 0 to -127 dB
    */
  volume: number;
};

export type AnalogSynthOscillatorsSettings = {
  osc1: OscillatorSettings;
  osc2: OscillatorSettings;
};

export function createAnalogSynthOscillatorsPool({
  initialSettings,
}: {
  initialSettings: undefined | DeepPartial<AnalogSynthOscillatorsSettings>;
}) {
  type OscillatorsCombination = {
    frequency: Tone.Signal<"frequency">;
    osc1: Tone.Oscillator;
    osc2: Tone.Oscillator;
  };

  type OscillatorsPool = {
    free: Array<OscillatorsCombination>;
    // key: y position in piano roll
    occupied: Map<number, OscillatorsCombination>;
  };

  /* --- */
  /* --- */
  /* --- */

  let osc1Shape =
    initialSettings?.osc1?.shape ?? AnalogSynthOscillatorShape.Triangle;
  let osc2Shape =
    initialSettings?.osc2?.shape ?? AnalogSynthOscillatorShape.Triangle;

  /* --- */
  /* --- */
  /* --- */

  const oscillatorsPool: OscillatorsPool = {
    free: [],
    occupied: new Map(),
  };

  /* --- */
  /* --- */
  /* --- */

  const osc1Volume = new Tone.Signal<"decibels">({
    units: "decibels",
    value: initialSettings?.osc1?.volume ?? 0,
  });
  const osc2Volume = new Tone.Signal<"decibels">({
    units: "decibels",
    value: initialSettings?.osc2?.volume ?? -127,
  });

  const osc1Detune = new Tone.Signal<"cents">({
    units: "cents",
    value: octaveAndRemainderCentsToTotalCents({
      octaves: initialSettings?.osc1?.detuneOctaves ?? 0,
      cents: initialSettings?.osc1?.detuneCents ?? 0,
    }),
  });
  const osc2Detune = new Tone.Signal<"cents">({
    units: "cents",
    value: octaveAndRemainderCentsToTotalCents({
      octaves: initialSettings?.osc1?.detuneOctaves ?? 0,
      cents: initialSettings?.osc1?.detuneCents ?? 0,
    }),
  });

  /* --- */
  /* --- */
  /* --- */

  const createOscillatorsGroup = ({
    filter,
  }: {
    filter: Tone.BiquadFilter;
  }) => {
    const osc1 = new Tone.Oscillator({
      type: osc1Shape,
    });
    osc1.connect(filter);

    const osc2 = new Tone.Oscillator({
      type: osc2Shape,
    });
    osc1.connect(filter);

    const frequency = new Tone.Signal({ units: "frequency", value: "A4" });

    frequency.connect(osc1.frequency);
    frequency.connect(osc2.frequency);

    osc1Detune.connect(osc1.detune);
    osc2Detune.connect(osc2.detune);

    osc1Volume.connect(osc1.volume);
    osc2Volume.connect(osc2.volume);

    return {
      frequency,
      osc1,
      osc2,
    };
  };

  /* --- */
  /* --- */
  /* --- */

  return {
    osc1: {
      getShape: () => osc1Shape,
      setShape: (
        shape: AnalogSynthOscillatorShape,
        filter: Tone.BiquadFilter
      ) => {
        osc1Shape = shape;

        for (const combination of oscillatorsPool.free) {
          combination.osc1.dispose();

          combination.osc1 = new Tone.Oscillator({
            type: osc1Shape,
          });

          combination.osc1.connect(filter);
        }
      },
      getDetuneOctaves: () => {
        const { octaves } = totalCentsToOctaveAndRemainderCents(
          osc1Detune.getValueAtTime(Tone.now())
        );

        return octaves;
      },
      setDetuneOctaves(octaves: number) {
        const { remainderCents } = totalCentsToOctaveAndRemainderCents(
          osc1Detune.getValueAtTime(Tone.now())
        );

        osc1Detune.setValueAtTime(
          octaveAndRemainderCentsToTotalCents({
            octaves: octaves,
            cents: remainderCents,
          }),
          Tone.now()
        );
      },
      getDetuneCents: () => {
        const { remainderCents } = totalCentsToOctaveAndRemainderCents(
          osc1Detune.getValueAtTime(Tone.now())
        );

        return remainderCents;
      },
      setDetuneCents(cents: number) {
        const { octaves } = totalCentsToOctaveAndRemainderCents(
          osc1Detune.getValueAtTime(Tone.now())
        );

        osc1Detune.setValueAtTime(
          octaveAndRemainderCentsToTotalCents({
            octaves: octaves,
            cents: cents,
          }),
          Tone.now()
        );
      },
      getVolume: () => osc2Volume.getValueAtTime(Tone.now()),
      setVolume(value: number) {
        osc1Volume.setValueAtTime(value, Tone.now());
      },
    },
    osc2: {
      getShape: () => osc2Shape,
      setShape: (
        shape: AnalogSynthOscillatorShape,
        filter: Tone.BiquadFilter
      ) => {
        osc2Shape = shape;

        for (const combination of oscillatorsPool.free) {
          combination.osc2.dispose();

          combination.osc2 = new Tone.Oscillator({
            type: osc1Shape,
          });

          combination.osc2.connect(filter);
        }
      },
      getDetuneOctaves: () => {
        const { octaves } = totalCentsToOctaveAndRemainderCents(
          osc2Detune.getValueAtTime(Tone.now())
        );

        return octaves;
      },
      setDetuneOctaves(octaves: number) {
        const { remainderCents } = totalCentsToOctaveAndRemainderCents(
          osc2Detune.getValueAtTime(Tone.now())
        );

        osc2Detune.setValueAtTime(
          octaveAndRemainderCentsToTotalCents({
            octaves: octaves,
            cents: remainderCents,
          }),
          Tone.now()
        );
      },
      getDetuneCents: () => {
        const { remainderCents } = totalCentsToOctaveAndRemainderCents(
          osc2Detune.getValueAtTime(Tone.now())
        );

        return remainderCents;
      },
      setDetuneCents(cents: number) {
        const { octaves } = totalCentsToOctaveAndRemainderCents(
          osc2Detune.getValueAtTime(Tone.now())
        );

        osc2Detune.setValueAtTime(
          octaveAndRemainderCentsToTotalCents({
            octaves: octaves,
            cents: cents,
          }),
          Tone.now()
        );
      },
      getVolume: () => osc2Volume.getValueAtTime(Tone.now()),
      setVolume(value: number) {
        osc2Volume.setValueAtTime(value, Tone.now());
      },
    },
    triggerAttack: ({
      y,
      filter,
    }: {
      y: number;
      filter: Tone.BiquadFilter;
    }) => {
      let oscillatorsGroup = oscillatorsPool.free.pop();

      if (!oscillatorsGroup) {
        oscillatorsGroup = createOscillatorsGroup({ filter });
      }

      oscillatorsPool.occupied.set(y, oscillatorsGroup);

      oscillatorsGroup.frequency.setValueAtTime(yToNoteName(y), Tone.now());
      oscillatorsGroup.osc1.start(0);
      oscillatorsGroup.osc2.start(0);
    },
    triggerRelease: ({
      y,
      release,
    }: {
      y: number;
      release: Tone.Unit.Time;
    }) => {
      const oscillatorsGroup = oscillatorsPool.occupied.get(y) ?? throwError();

      oscillatorsGroup.osc1.stop(release);
      oscillatorsGroup.osc2.stop(release);

      Tone.Transport.schedule(() => {
        oscillatorsPool.occupied.delete(y);
        oscillatorsPool.free.push(oscillatorsGroup);
      }, release);
    },
    dispose: () => {
      osc1Volume.dispose();
      osc2Volume.dispose();

      osc1Detune.dispose();
      osc2Detune.dispose();

      for (const oscillatorsCombination of oscillatorsPool.free) {
        oscillatorsCombination.frequency.dispose();
        oscillatorsCombination.osc1.dispose();
        oscillatorsCombination.osc2.dispose();
      }

      oscillatorsPool.occupied.forEach((oscillatorsCombination) => {
        oscillatorsCombination.frequency.dispose();
        oscillatorsCombination.osc1.dispose();
        oscillatorsCombination.osc2.dispose();
      });
    },
  };
}
