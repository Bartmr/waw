import Link from "next/link";
import React from "react";

export function RouterLink(props: React.ComponentProps<typeof Link>) {
  return <Link {...props} passHref />;
}
