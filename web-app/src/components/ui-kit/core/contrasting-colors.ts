import { theme } from "antd";
import tinyColor from "tinycolor2";
import { useExtraToken } from "./extra-token";

export function useContrastingColors() {
  const { token } = theme.useToken();
  const extraToken = useExtraToken();

  const get = (dominantColor: string) => {
    const _dominantColor = tinyColor(dominantColor);

    const lightColors = {
      neutral: token.colorBgBase,
      primary: token.colorPrimary,
      info: token.colorInfo,
      success: token.colorSuccess,
      warning: token.colorWarning,
      error: token.colorError,
      technical: "#f1ff75",
    };

    const darkColors = {
      neutral: token.colorTextBase,
      primary: token.colorPrimary,
      info: token.colorInfo,
      success: tinyColor(token.colorSuccess).darken(5),
      warning: token.colorWarning,
      error: token.colorError,
      technical: "#ffb300",
    };

    return _dominantColor.isDark() ? lightColors : darkColors;
  };

  return {
    get,
  };
}
