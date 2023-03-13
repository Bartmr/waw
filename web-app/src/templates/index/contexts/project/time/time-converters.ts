/*
  Bar / measure is composed of
  1 = whole note (you’ll never see this)
  2 = half note
  4 = quarter note
  8 = eighth note
  16 = sixteenth note 
*/

import { number } from "zod";

export function secondsToMeasures(args: { bpm: number; seconds: number }) {
  return (args.seconds * (args.bpm / 60)) / 4;
}

export function measuresToSeconds(args: { bpm: number; measures: number }) {
  return (args.measures * 4) / (args.bpm / 60);
}

export function sixteenthsToSeconds(args: { bpm: number; sixteenths: number }) {
  return args.sixteenths / 4 / (args.bpm / 60);
}

export function lengthToBarsQuartersSixteenthsSignature({
  startX,
  endX,
}: {
  startX: number;
  endX: number;
  bpm: number;
}) {
  const totalSixteenthNotes = endX - startX;

  const bars = Math.floor(totalSixteenthNotes / 16);
  const beats = Math.floor((totalSixteenthNotes % 16) / 4);
  const sixteenthNotes = Math.floor(totalSixteenthNotes % 16);

  return `${bars}:${beats}:${sixteenthNotes}`;
}
