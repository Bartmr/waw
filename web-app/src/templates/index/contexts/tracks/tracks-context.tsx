import { throwError } from "@/logic/internals/utils/throw-error";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useProjectContext } from "../project/project-context";
import { Project } from "../project/project.types";
import { createNotesTrack } from "./note-track/create-notes-track";
import { AnyTrack, NotesTrack, TrackType } from "./track.types";

type IndexedTracks = {
  [trackId: string]: NotesTrack;
};

const Context = createContext<null | IndexedTracks>(null);

export function TracksContextProvider(props: { children: ReactNode }) {
  const { project } = useProjectContext();

  const regenerateTracks = useCallback(
    ({
      indexedTracks,
      tracksInProject,
    }: {
      indexedTracks: IndexedTracks;
      tracksInProject: Project.AnyTrack[];
    }) => {
      const tracks: IndexedTracks[string][] = Object.values(indexedTracks);

      /*
      Dispose of tracks that were removed from the project
    */
      for (const track of tracks) {
        if (!tracksInProject.find((t) => t.id === track.trackId)) {
          track.dispose();
        }
      }

      /*
      See what tracks were added and what tracks were changed
    */
      const tracksInProjectToAdd: Project.AnyTrack[] = [];
      const matchingTracks: Array<{
        project: Project.AnyTrack;
        runtime: AnyTrack;
      }> = [];

      for (const trackInProject of tracksInProject) {
        const track = tracks.find((t) => t.trackId === trackInProject.id);
        if (track) {
          matchingTracks.push({
            project: trackInProject,
            runtime: track,
          });
        } else {
          tracksInProjectToAdd.push(trackInProject);
        }
      }

      /*
      Reflect added and changed tracks, by instatiating the tracks instruments and audio effects
    */

      const newlyIndexedTracks: IndexedTracks = {};

      for (const trackInProjectToAdd of tracksInProjectToAdd) {
        if (trackInProjectToAdd.type === TrackType.Notes) {
          newlyIndexedTracks[trackInProjectToAdd.id] = createNotesTrack({
            trackInProject: trackInProjectToAdd,
          });
        } else {
          throw new Error();
        }
      }

      for (const matchingTracksPair of matchingTracks) {
        const projectTrack = matchingTracksPair.project;
        const runtimeTrack = matchingTracksPair.runtime;

        if (
          projectTrack.type === TrackType.Notes &&
          runtimeTrack.type === TrackType.Notes
        ) {
          const projectTrackToken = JSON.stringify({
            instrument: projectTrack.instrument?.type,
            audioEffects: projectTrack.audioEffects.map((aFx) => aFx.type),
          });
          const runtimeTrackToken = JSON.stringify({
            instrument: runtimeTrack.instrumentBox?.type,
            audioEffects: runtimeTrack.audioEffectBoxes.map((aFx) => aFx.type),
          });

          if (projectTrackToken === runtimeTrackToken) {
            newlyIndexedTracks[runtimeTrack.trackId] = runtimeTrack;
            continue;
          }
        }

        runtimeTrack.dispose();

        if (projectTrack.type === TrackType.Notes) {
          newlyIndexedTracks[projectTrack.id] = createNotesTrack({
            trackInProject: projectTrack,
          });
        } else {
          throw new Error();
        }
      }

      return newlyIndexedTracks;
    },
    []
  );

  const [indexedTracks, setIndexedTracks] = useState<IndexedTracks>(
    regenerateTracks({ indexedTracks: {}, tracksInProject: project.tracks })
  );

  useEffect(() => {
    setIndexedTracks(
      regenerateTracks({ indexedTracks: {}, tracksInProject: project.tracks })
    );
  }, [project.tracks, regenerateTracks]);

  return (
    <Context.Provider value={indexedTracks}>{props.children}</Context.Provider>
  );
}

export function useTracksContext() {
  return useContext(Context) || throwError();
}
