import dynamic from "next/dynamic";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Editor = dynamic(() => import("components/Editor"), { ssr: false });

export default function Home(): JSX.Element {
  const { query } = useRouter();
  const isExportMode = useMemo(() => "exportMode" in query, [query]);

  return (
    <>
      <Head>
        <title>JUXTDraw</title>
      </Head>
      <Editor id="home" showUI={!isExportMode} />
    </>
  );
}
