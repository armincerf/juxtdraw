import * as React from "react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
const MultiplayerEditor = dynamic(
  () => import("components/MultiplayerEditor"),
  { ssr: false }
);

interface RoomProps {
  id: string;
  isUser: boolean;
}

export default function Room({ id, isUser }: RoomProps): JSX.Element {
  return <MultiplayerEditor isUser={isUser} roomId={id} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const id = context.query.id?.toString();
  return {
    props: {
      id,
      isUser: session?.user ? true : false,
    },
  };
};
