import { throwError } from "@/logic/internals/utils/throw-error";
import { Tone } from "@/logic/internals/vendors/tone";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ContextValue = { hasStarted: boolean; start: () => Promise<void> };

const Context = createContext<null | ContextValue>(null);

export function ToneStartContextProvider(props: { children: ReactNode }) {
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(async () => {
    await Tone.start();
    setHasStarted(true);
  }, []);

  return (
    <Context.Provider
      value={useMemo(() => {
        return {
          hasStarted,
          start,
        };
      }, [hasStarted, start])}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useToneStartContext() {
  return useContext(Context) || throwError();
}
