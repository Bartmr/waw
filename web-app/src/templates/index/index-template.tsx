import { PageWrapper } from "@/components/routing/page/wrapper";
import { FullBodyHeight } from "@/components/ui-kit/components/full-body-height";
import { useExtraToken } from "@/components/ui-kit/core/extra-token";
import { useToken } from "@/components/ui-kit/core/token";
import { useEffect } from "react";
import {
  PlaybackContextProvider,
  usePlaybackContext,
} from "./contexts/playback/playback-context";
import { ProjectContextProvider } from "./contexts/project/project-context";
import { SelectionContextProvider } from "./contexts/selection/selection-context";
import { TracksContextProvider } from "./contexts/tracks/tracks-context";
import { INDEX_ROUTE } from "./index-routes";
import { TopBar } from "./sections/top-bar";
import { Tracks } from "./sections/tracks/tracks";
import { Workspace } from "./sections/workspace/workspace";
import { OnScreenKeyboard } from "./sections/on-screen-keyboard/on-screen-keyboard";
import { ToneStartContextProvider } from "./contexts/tone-start/use-tone-start-context";

function Content() {
  const token = useToken();
  const extraToken = useExtraToken();

  return (
    <FullBodyHeight>
      <OnScreenKeyboard />
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div>
          <TopBar />
        </div>
        <div
          style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
        >
          <Tracks />
        </div>
        <div
          style={{
            height: "35%",
            borderTop: `1px solid ${token.colorTextBase}`,
            backgroundColor: token.colorBgBase,
          }}
        >
          <div
            style={{
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Workspace />
          </div>
        </div>
      </div>
    </FullBodyHeight>
  );
}

export function IndexTemplate() {
  return (
    <PageWrapper title={INDEX_ROUTE.title}>
      <ToneStartContextProvider>
        <ProjectContextProvider>
          <SelectionContextProvider>
            <TracksContextProvider>
              <PlaybackContextProvider>
                <Content />
              </PlaybackContextProvider>
            </TracksContextProvider>
          </SelectionContextProvider>
        </ProjectContextProvider>
      </ToneStartContextProvider>
    </PageWrapper>
  );
}
