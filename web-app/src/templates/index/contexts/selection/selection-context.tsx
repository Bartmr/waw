import { throwError } from "@/logic/internals/utils/throw-error";
import { useStateAndRef } from "@/logic/internals/utils/use-state-and-ref";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { SelectionType } from "./selection.enums";
import { Selection } from "./selection.types";

type ContextValue = {
  selection: Selection;
  selectionRef: MutableRefObject<Selection>;
  setSelection: (selection: Selection) => void;
};
const Context = createContext<null | ContextValue>(null);

export function SelectionContextProvider(props: { children: ReactNode }) {
  const [selection, selectionRef, setSelection] = useStateAndRef<Selection>({
    type: SelectionType.Nothing,
  });

  return (
    <Context.Provider
      value={useMemo(() => {
        return {
          selection,
          selectionRef,
          setSelection,
        };
      }, [selection, selectionRef, setSelection])}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useSelectionContext() {
  return useContext(Context) || throwError();
}
