import { theme } from "antd";
import { GlobalToken, OverrideToken } from "antd/es/theme/interface";

export function useToken() {
  return theme.useToken().token as GlobalToken & OverrideToken;
}
