import { useToken } from "@/components/ui-kit/core/token";
import { throwError } from "@/logic/internals/utils/throw-error";
import { useProjectContext } from "@/templates/index/contexts/project/project-context";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { Button, Col, Dropdown, Input, Row, Typography } from "antd";
import Measure from "react-measure";

export function TrackIndicators(props: {
  trackId: string;
  onHeightChange: (height: number | undefined) => void;
}) {
  const { project, setProject } = useProjectContext();

  const track =
    project.tracks.find((t) => t.id === props.trackId) ?? throwError();

  const token = useToken();

  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        props.onHeightChange(contentRect.bounds?.height);
      }}
    >
      {({ measureRef }) => (
        <div
          ref={measureRef}
          style={{
            paddingTop: token.paddingSM,
            paddingBottom: token.paddingSM,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Row
            style={{
              paddingLeft: token.paddingSM,
            }}
            align={"middle"}
          >
            <Col flex={1}>
              <Input
                value={track.label}
                onChange={(e) => {
                  setProject({
                    ...project,
                    tracks: project.tracks.map((t) => {
                      if (t.id === props.trackId) {
                        return {
                          ...t,
                          label: e.target.value,
                        };
                      } else {
                        return t;
                      }
                    }),
                  });
                }}
                size="small"
              />
            </Col>
            <Col flex={0}>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      key: "delete",
                      label: "Delete",
                      danger: true,
                      icon: <Delete />,
                      onClick: () => {
                        setProject({
                          ...project,
                          tracks: project.tracks.filter((t) => {
                            return t.id !== props.trackId;
                          }),
                        });
                      },
                    },
                  ],
                }}
              >
                <Button type="ghost" icon={<MoreVert />} />
              </Dropdown>
            </Col>
          </Row>
        </div>
      )}
    </Measure>
  );
}
