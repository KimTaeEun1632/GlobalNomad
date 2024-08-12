import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["clusterer", "drawing", "services"],
  });

  const kakao = typeof window !== "undefined" ? window.kakao : null;

  return [loading, error, kakao];
};

export default useKakaoLoader;
