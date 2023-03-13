import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { useToken } from "@/components/ui-kit/core/token";
import tinycolor from "tinycolor2";

const font = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

function StyleOverrides() {
  const token = useToken();

  return (
    <style jsx global>{`
      html {
        --font-1: ${font.style.fontFamily};
        font-family: ${font.style.fontFamily};
      }

      .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item-icon {
        margin-inline-start: -4px;
      }

      .ant-dropdown .ant-dropdown-menu {
        border: 1px solid ${token.colorBorder};
      }

      .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item-icon {
        font-size: 1.5rem;
      }

      .ant-btn.ant-btn-dashed {
        border-width: 2px;
        border-color: 1px solid ${token.colorBorder};
      }

      .MuiSvgIcon-root {
        vertical-align: -0.35rem;
      }
    `}</style>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "var(--font-1)",
            colorBorder: tinycolor("#000000").setAlpha(0.3).toRgbString(),
            colorBorderSecondary: tinycolor("#000000")
              .setAlpha(0.15)
              .toRgbString(),
          },
        }}
      >
        <StyleOverrides />

        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
