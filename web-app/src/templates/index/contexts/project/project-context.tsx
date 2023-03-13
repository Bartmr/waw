import { throwError } from "@/logic/internals/utils/throw-error";
import { useStateAndRef } from "@/logic/internals/utils/use-state-and-ref";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { v1 } from "uuid";
import { measuresToSeconds } from "./time/time-converters";
import { Project } from "./project.types";
import { Track } from "../tracks/track.types";
import {
  Instrument,
  InstrumentType,
} from "../tracks/devices/instruments/instruments.types";

type ContextValue = {
  project: Project.Project;
  projectRef: MutableRefObject<Project.Project>;
  setProject: (value: Project.Project) => void;
  lengthInSeconds: number;
};
const Context = createContext<null | ContextValue>(null);

const PROJECT_MOCK: Project.Project = {
  bpm: 128,
  lengthInMeasures: 4,
  tracks: [
    {
      type: Track.Type.Notes,
      id: v1(),
      label: "Track 1",
      notes: [],
      instrument: {
        type: InstrumentType.AnalogSynth,
        settings: {},
      },
      audioEffects: [],
    },
    {
      type: Track.Type.Notes,
      id: v1(),
      label: "Track 2",
      notes: [],
      instrument: undefined,
      audioEffects: [],
    },
  ],
};

export function ProjectContextProvider(props: { children: ReactNode }) {
  const [project, projectRef, setProject] =
    useStateAndRef<Project.Project>(PROJECT_MOCK);

  return (
    <Context.Provider
      value={useMemo(() => {
        return {
          project,
          projectRef,
          setProject,
          lengthInSeconds: measuresToSeconds({
            bpm: project.bpm,
            measures: project.lengthInMeasures,
          }),
        };
      }, [project, projectRef, setProject])}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useProjectContext() {
  return useContext(Context) || throwError();
}
