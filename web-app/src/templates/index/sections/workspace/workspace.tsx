import { useExtraToken } from "@/components/ui-kit/core/extra-token";
import { useToken } from "@/components/ui-kit/core/token";
import { throwError } from "@/logic/internals/utils/throw-error";
import { ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import { NotesEditor } from "./notes-editor/notes-editor";

export function Workspace() {
  const token = useToken();
  const extraToken = useExtraToken();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
      }}
    >
      <NotesEditor />
    </div>
  );
}
