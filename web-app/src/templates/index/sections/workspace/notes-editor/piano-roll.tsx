import { useContrastingColors } from "@/components/ui-kit/core/contrasting-colors";
import { useToken } from "@/components/ui-kit/core/token";
import { Tone } from "@/logic/internals/vendors/tone";
import { yToNoteName } from "@/templates/index/contexts/project/notes/note-converters";
import { Typography } from "antd";
import { KEY_HEIGHT, TOTAL_KEYS } from "./notes-editor.constants";

export function PianoRoll(props: {
  onAttack: (y: number) => void;
  onRelease: (y: number) => void;
}) {
  const token = useToken();

  return (
    <>
      {new Array(TOTAL_KEYS)
        .fill(null)
        .map((_, i) => {
          const keyName = yToNoteName(i);
          const isSharp = keyName.includes("#");

          return (
            <div
              onPointerDown={() => props.onAttack(i)}
              onPointerUp={() => props.onRelease(i)}
              onPointerOut={() => props.onRelease(i)}
              key={`piano-key-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: token.paddingSM,
                paddingRight: token.paddingSM,
                height: KEY_HEIGHT,
                borderRight: `1px solid ${token.colorBorder}`,
                borderBottom: `1px solid ${token.colorBorder}`,
                background: isSharp ? token.colorText : token.colorBgBase,
                cursor: "pointer",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: token.fontSizeSM,
                  color: isSharp ? token.colorBgBase : token.colorText,
                  userSelect: "none",
                }}
              >
                {keyName}
              </Typography.Text>
            </div>
          );
        })
        .reverse()}
    </>
  );
}
