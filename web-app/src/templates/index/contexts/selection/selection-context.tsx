import { throwError } from "@/logic/internals/utils/throw-error";
import { createContext, ReactNode, useContext, useState } from "react";
import { SelectionType } from "./selection.enums";
import { Selection } from "./selection.types";

type ContextValue = Selection;
const Context = createContext<null | ContextValue>(null);

export function SelectionContextProvider(props: { children: ReactNode }) {
  return (
    <Context.Provider value={{ type: SelectionType.Nothing }}>
      {props.children}
    </Context.Provider>
  );
}

export function useSelectionContext() {
  return useContext(Context) || throwError();
}
