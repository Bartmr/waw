export function addOctavesToNoteName(noteName: string, octavesToAdd: number) {
  const noteNameWithoutOctave = noteName.slice(0, -1);
  const octaveInNote = Number(noteName[noteName.length - 1]);

  if (isNaN(octaveInNote)) {
    throw new Error();
  }

  const octavesAfterAddition = octaveInNote + octavesToAdd;

  return `${noteNameWithoutOctave}${octavesAfterAddition}`;
}
