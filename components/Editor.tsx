import React from "react";
import { Tldraw, TldrawApp, TldrawProps, useFileSystem } from "@tldraw/tldraw";
import { exportToImage } from "utils/export";

declare const window: Window & { app: TldrawApp };

interface EditorProps {
  id?: string;
}

export default function Editor({
  id = "home",
  ...rest
}: EditorProps & Partial<TldrawProps>) {
  const handleMount = React.useCallback((app: TldrawApp) => {
    window.app = app;
  }, []);

  // Send events to gtag as actions.
  const handlePersist = React.useCallback(
    (_app: TldrawApp, reason?: string) => {
      console.log("persist", reason);
    },
    []
  );

  const fileSystemEvents = useFileSystem();

  return (
    <div className="tldraw">
      <Tldraw
        id={id}
        autofocus
        onMount={handleMount}
        onPersist={handlePersist}
        onExport={exportToImage}
        {...fileSystemEvents}
        {...rest}
      />
    </div>
  );
}
