import { useToken } from "@/components/ui-kit/core/token";
import { PlayArrowSharp, Stop } from "@mui/icons-material";
import { Button, Col, Form, Input, Row } from "antd";
import { useProjectContext } from "../contexts/project/project-context";
import { useEffect, useState } from "react";
import { usePlaybackContext } from "../contexts/playback/playback-context";

export function TopBar() {
  const token = useToken();
  const playbackContext = usePlaybackContext();

  const { project, projectRef, setProject } = useProjectContext();

  const [bpm, setBPM] = useState(project.bpm.toString());
  const bpmNumber = Number(bpm);
  const bpmIsValid =
    !isNaN(bpmNumber) && Number.isInteger(bpmNumber) && bpmNumber >= 1;

  useEffect(() => {
    if (bpmIsValid) {
      setProject({
        ...projectRef.current,
        bpm: bpmNumber,
      });
    }
  }, [bpmNumber, bpmIsValid, setProject, projectRef]);

  const [lengthInMeasures, setLengthInMeasures] = useState(
    project.lengthInMeasures.toString()
  );
  const lengthInMeasuresNumber = Number(lengthInMeasures);
  const lengthInMeasuresIsValid =
    !isNaN(lengthInMeasuresNumber) &&
    Number.isInteger(lengthInMeasuresNumber) &&
    lengthInMeasuresNumber >= 1;

  useEffect(() => {
    if (lengthInMeasuresIsValid) {
      setProject({
        ...projectRef.current,
        lengthInMeasures: lengthInMeasuresNumber,
      });
    }
  }, [lengthInMeasuresNumber, lengthInMeasuresIsValid, setProject, projectRef]);

  return (
    <div
      style={{
        padding: token.padding,
        boxShadow: token.boxShadow,
        backgroundColor: token.colorBgBase,
        position: "relative",
        zIndex: 2,
      }}
    >
      <Row wrap={false} gutter={token.margin}>
        <Col flex="none">
          <Button.Group size="large">
            <Button
              onClick={async () => {
                playbackContext.play();
              }}
              type="primary"
              title="Play"
              icon={<PlayArrowSharp />}
            />
            <Button
              onClick={() => {
                playbackContext.stop();
              }}
              title="Stop"
              icon={<Stop />}
            />
          </Button.Group>
        </Col>
        <Col flex="none">
          <Form size="large" layout="horizontal">
            <Row gutter={token.margin}>
              <Col span={"none"}>
                <Form.Item style={{ margin: 0 }} label="BPM">
                  <Input
                    status={bpmIsValid ? undefined : "error"}
                    style={{ width: "128px" }}
                    value={bpm}
                    onChange={(e) => setBPM(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={"none"}>
                <Form.Item style={{ margin: 0 }} label="Length in measures">
                  <Input
                    status={lengthInMeasuresIsValid ? undefined : "error"}
                    style={{ width: "128px" }}
                    value={lengthInMeasures}
                    onChange={(e) => setLengthInMeasures(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
