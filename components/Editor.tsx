import React from "react";
import { Tldraw, TldrawApp, TldrawProps, useFileSystem } from "@tldraw/tldraw";
import { useAccountHandlers } from "hooks/useAccountHandlers";
import { exportToImage } from "utils/export";

declare const window: Window & { app: TldrawApp };

interface EditorProps {
  id?: string;
  isUser?: boolean;
}

export default function Editor({
  id = "home",
  isUser = false,
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

  const { onSignIn, onSignOut } = useAccountHandlers();

  return (
    <div className="tldraw">
      <Tldraw
        id={id}
        autofocus
        onMount={handleMount}
        onPersist={handlePersist}
        onSignIn={onSignIn}
        onSignOut={isUser ? onSignOut : undefined}
        onExport={exportToImage}
        {...fileSystemEvents}
        {...rest}
      />
    </div>
  );
}
