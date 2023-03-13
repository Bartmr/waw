import { Spin, theme } from "antd";
import { CSSProperties } from "react";

export function Spinner(props: {
  size?: "small" | "large";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        ...props.style,
      }}
    >
      <Spin size={props.size} />
    </div>
  );
}
