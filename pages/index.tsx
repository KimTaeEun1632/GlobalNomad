import HeadMeta from "@/Components/Common/HeadMeta";
import MainPage from "@/Components/MainPage";
import { META_TAG } from "@/constants/metaTag";
import { useSession } from "next-auth/react";
import Head from "next/head";

const IndexPage = () => {
  const { status } = useSession();

  return (
    <>
      <HeadMeta
        title={META_TAG.home["title"]}
        description={META_TAG.myReservation["description"]}
      />
      {status === "authenticated" ? <MainPage /> : <MainPage />}
    </>
  );
};

export default IndexPage;
