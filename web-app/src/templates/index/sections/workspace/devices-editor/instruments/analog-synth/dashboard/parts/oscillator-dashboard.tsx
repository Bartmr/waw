import { useContrastingColors } from "@/components/ui-kit/core/contrasting-colors";
import { useExtraToken } from "@/components/ui-kit/core/extra-token";
import { useToken } from "@/components/ui-kit/core/token";
import { AnalogSynthOscillatorShape } from "@/templates/index/contexts/tracks/devices/instruments/analog-synth/parts/oscillators";
import { ArrowDropDown } from "@mui/icons-material";
import { Typography } from "antd";

export function OscillatorDashboard() {
  const token = useToken();
  const extraToken = useExtraToken();
  const contrastingColors = useContrastingColors();

  return (
    <div>
      <div
        style={{
          width: "100%",
          paddingTop: token.padding,
          paddingLeft: token.padding,
          paddingBottom: token.padding,
          paddingRight: token.paddingXS,
          backgroundColor: extraToken.colorDarkBg,
          borderRadius: token.borderRadiusLG,
        }}
      >
        <Typography.Text
          style={{
            fontFamily: extraToken.technicalFontFamily,
            textTransform: "uppercase",
            color: contrastingColors.get(extraToken.colorDarkBg).technical,
          }}
        >
          Square
          <ArrowDropDown />
        </Typography.Text>
      </div>
    </div>
  );
}
