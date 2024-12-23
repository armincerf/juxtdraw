import * as React from "react";
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { createClient } from "@liveblocks/client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { styled } from "styles";
import { useMultiplayerState } from "hooks/useMultiplayerState";
import { exportToImage } from "utils/export";
import { useMultiplayerAssets } from "hooks/useMultiplayerAssets";

const client = createClient({
  publicApiKey: "pk_live_Qc1iDr3AYXxgTtRxirUiWYdk",
  throttle: 80,
});

export default function MultiplayerEditor({ roomId }: { roomId: string }) {
  return (
    <LiveblocksProvider client={client}>
      <RoomProvider id={roomId}>
        <Editor roomId={roomId} />
      </RoomProvider>
    </LiveblocksProvider>
  );
}

// Inner Editor

function Editor({ roomId }: { roomId: string }) {
  const fileSystemEvents = useFileSystem();
  const { error, ...events } = useMultiplayerState(roomId);
  const { onAssetCreate, onAssetDelete } = useMultiplayerAssets();

  if (error) return <LoadingScreen>Error: {error.message}</LoadingScreen>;

  return (
    <div className="tldraw">
      <Tldraw
        autofocus
        disableAssets={false}
        showPages={false}
        onExport={exportToImage}
        onAssetCreate={onAssetCreate}
        onAssetDelete={onAssetDelete}
        {...fileSystemEvents}
        {...events}
      />
    </div>
  );
}

const LoadingScreen = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
