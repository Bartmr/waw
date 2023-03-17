import { useEffect, useState } from "react";
import { useSelectionContext } from "../../contexts/selection/selection-context";
import { useTracksContext } from "../../contexts/tracks/tracks-context";

export function OnScreenKeyboard() {
  const [currentOctave, setCurrentOctave] = useState(4);

  const selection = useSelectionContext();

  useEffect(() => {
    setCurrentOctave(4);
  }, [selection]);

  const tracks = useTracksContext();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {});

    window.addEventListener("keyup", (e) => {});
  }, [tracks]);

  return <></>;
}
