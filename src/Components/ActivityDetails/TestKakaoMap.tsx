import useKakaoLoader from "@/hooks/useKakaoMap";
import { useRef, useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const TestKakaoMap = () => {
  const [loading, error, kakao] = useKakaoLoader();
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });

  useEffect(() => {
    if (!loading && !error && kakao) {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        "서울 중구 청계천로 100", // 실제 맵 사용시 address를 프롭으로 받는 형식으로 바꿔서 이용
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const newCenter = {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            };
            setCenter(newCenter);
          }
        },
      );
    }
  }, [loading, error, kakao]);

  if (loading || error) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Map center={center} style={{ width: "100%", height: "500px" }}>
        <MapMarker position={center} />
      </Map>
    </>
  );
};

export default TestKakaoMap;
