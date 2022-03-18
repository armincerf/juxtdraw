import * as React from "react";
import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
const MultiplayerEditor = dynamic(
  () => import("components/MultiplayerEditor"),
  { ssr: false }
);

interface RoomProps {
  id: string;
}

export default function Room({ id }: RoomProps): JSX.Element {
  return <MultiplayerEditor roomId={id} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id?.toString();
  return {
    props: {
      id,
    },
  };
};
