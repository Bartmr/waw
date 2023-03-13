import Head from "next/head";
import { ReactNode, use, useEffect, useState } from "react";

export function PageWrapper(props: { children: ReactNode; title: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Head>
        <title>{`${props.title}`}</title>
      </Head>
      {show ? props.children : null}
    </>
  );
}
