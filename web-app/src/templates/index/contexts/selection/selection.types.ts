import { SelectionType } from "./selection.enums";

export type NothingSelection = {
  type: SelectionType.Nothing;
};

export type TrackSelection = {
  type: SelectionType.Track;
  trackId: string;
};

export type Selection = NothingSelection | TrackSelection;
