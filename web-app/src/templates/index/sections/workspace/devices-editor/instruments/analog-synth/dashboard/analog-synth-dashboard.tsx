import { useToken } from "@/components/ui-kit/core/token";
import { throwError } from "@/logic/internals/utils/throw-error";
import { useProjectContext } from "@/templates/index/contexts/project/project-context";
import { useSelectionContext } from "@/templates/index/contexts/selection/selection-context";
import { SelectionType } from "@/templates/index/contexts/selection/selection.enums";
import { useTracksContext } from "@/templates/index/contexts/tracks/tracks-context";
import { Col, Row } from "antd";
import { OscillatorDashboard } from "./parts/oscillator-dashboard";

export function AnalogSynthDashboard() {
  const token = useToken();

  const { project } = useProjectContext();
  const tracks = useTracksContext();
  const { selection } = useSelectionContext();

  if (selection.type !== SelectionType.Track) {
    throw new Error();
  }

  const track = tracks[selection.trackId] || throwError();

  return (
    <div style={{}}>
      <Row gutter={token.margin}>
        <Col>
          <Row gutter={token.marginSM}>
            <Col>
              <OscillatorDashboard />
            </Col>
            <Col>
              <OscillatorDashboard />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
