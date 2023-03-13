import { throwError } from "@/logic/internals/utils/throw-error";

export function yToNoteName(y: number) {
  const octaveNumber = Math.floor(y / 12);
  const letter = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ][y % 12];
  return `${letter}${octaveNumber + 1}`;
}

export const noteNameToFrequency = (note: string) => {
  const getNoteDistanceFromC0 = (note: string) => {
    // Notes in an octave
    const noteNumberMap: { [key: string]: number } = {
      C: 1,
      "C#": 2,
      D: 3,
      "D#": 4,
      E: 5,
      F: 6,
      "F#": 7,
      G: 8,
      "G#": 9,
      A: 10,
      "A#": 11,
      B: 12,
    };

    const getOctaveNum = (note: string) => Number(note.charAt(note.length - 1));

    return (
      (noteNumberMap[note.slice(0, -1)] ?? throwError()) -
      1 +
      getOctaveNum(note) * 12
    );
  };

  /*
   ** Formula based from — http://www.techlib.com/reference/musical_note_frequencies.htm
   ** 440Hz is the frequency of A4, which is 57 notes away from C0
   */
  return 440 * Math.pow(2, (getNoteDistanceFromC0(note) - 57) / 12);
};

export function totalCentsToOctaveAndRemainderCents(totalCents: number) {
  const remainderCents = totalCents % 1200;
  const octaves = (totalCents - remainderCents) / 1200;

  return {
    octaves,
    remainderCents,
  };
}

export function octaveAndRemainderCentsToTotalCents({
  octaves,
  cents,
}: {
  octaves: number;
  cents: number;
}) {
  return octaves * 1200 + cents;
}
