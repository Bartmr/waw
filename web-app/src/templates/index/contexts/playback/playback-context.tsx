import { throwError } from "@/logic/internals/utils/throw-error";
import { Tone } from "@/logic/internals/vendors/tone";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useProjectContext } from "../project/project-context";
import { secondsToMeasures } from "../project/time/time-converters";
import { useToneStartContext } from "../tone-start/use-tone-start-context";

type Unsubscribe = () => void;
type Callback = (data: { positionInMeasures: number }) => void;

type ContextValue = {
  play: () => void;
  stop: () => void;
  onPositionChange: (cb: Callback) => Unsubscribe;
  setPositionInSeconds: (time: number) => void;
};
const Context = createContext<null | ContextValue>(null);

export function PlaybackContextProvider(props: { children: ReactNode }) {
  const toneStart = useToneStartContext();

  const callbacksRef = useRef(new Set<Callback>());

  const projectContext = useProjectContext();

  const setupSchedulers = useCallback(() => {
    Tone.Transport.scheduleRepeat(() => {
      callbacksRef.current.forEach((cb) =>
        cb({
          positionInMeasures: secondsToMeasures({
            bpm: projectContext.project.bpm,
            seconds: Tone.Transport.seconds,
          }),
        })
      );
    }, "0:0:1");
  }, [projectContext.project.bpm]);

  return (
    <Context.Provider
      value={useMemo(() => {
        return {
          play: async () => {
            if (!toneStart.hasStarted) {
              toneStart.start();
            }

            setupSchedulers();

            Tone.Transport.timeSignature = 4;
            Tone.Transport.bpm.value = projectContext.project.bpm;

            Tone.Transport.start();
          },
          stop: async () => {
            Tone.Transport.stop();
            Tone.Transport.cancel();

            callbacksRef.current.forEach((cb) =>
              cb({
                positionInMeasures: 0,
              })
            );
          },
          onPositionChange: (cb) => {
            callbacksRef.current.add(cb);

            return () => {
              callbacksRef.current.delete(cb);
            };
          },
          setPositionInSeconds: (time) => {
            Tone.Transport.seconds = time;

            if (
              Tone.Transport.state === "paused" ||
              Tone.Transport.state === "stopped"
            ) {
              callbacksRef.current.forEach((cb) =>
                cb({
                  positionInMeasures: secondsToMeasures({
                    bpm: projectContext.project.bpm,
                    seconds: time,
                  }),
                })
              );
            }
          },
        };
      }, [projectContext.project.bpm, setupSchedulers, toneStart])}
    >
      {props.children}
    </Context.Provider>
  );
}

export function usePlaybackContext() {
  return useContext(Context) || throwError();
}
