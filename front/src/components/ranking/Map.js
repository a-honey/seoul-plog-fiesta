import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import geojson from '../../assets/seoul_municipalities_geo_simple.json';
import * as Api from '../../api';
import { handleMapData } from '../../utils/handleMapData';

const RankingMap = () => {
  return (
    <div className="gContainer mapWidth">
      <div className="titleContainer">
        <h1>플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map endpoint="/plo/count/all" id="" />
      </div>
    </div>
  );
};

export default RankingMap;

const Map = ({ endpoint, id }) => {
  const [data, setData] = useState({
    gangnam: 33,
    gangdong: 42,
    gangbuk: 41,
    gangseo: 22,
    gwanak: 12,
    gwangjin: 72,
    guro: 15,
    geumcheon: 45,
    nowon: 32,
    dobong: 51,
    dongdaemun: 74,
    dongjak: 53,
    mapo: 61,
    seodaemun: 32,
    seocho: 53,
    seongdong: 71,
    seongbuk: 84,
    songpa: 41,
    yangcheon: 16,
    yeongdeungpo: 48,
    yongsan: 14,
    eunpyeong: 53,
    jongno: 35,
    jung: 71,
    jungnang: 25,
  });
  const [isFetching, setIsFetching] = useState(false);

  // svg 요소에 지도를 그리기 위해 참조를 생성함
  const svgRef = useRef();

  const createMap = useCallback(() => {
    // 현재 참조된 요소에 지도를 그리겠다고 선언함
    const svg = d3.select(svgRef.current);

    const width = 800;
    const height = 600;

    // 메르카토르 투영을 생성 후, 사이즈 조절 및 geojson 파일을 투영할 것을 설정함
    const projection = d3.geoMercator().fitSize([width, height], geojson);

    // 지도 경로 생성 설정을 생성 후, 투영함
    const pathGenerator = d3.geoPath().projection(projection);

    // 색상 보간(시작 색상에서 끝 색상으로 점진적으로 변하는 색상)을 호출 후 이 값을 연속값 매핑 함수를 호출하여 0~10으로 매핑
    const colorScale = d3
      .scaleSequential(d3.interpolateGreens)
      .domain([0, 100]);

    svg
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path') // 모든 지역구를 추가함
      .attr('d', pathGenerator)
      .style('fill', (d) => {
        const districtName = d.properties.name_eng
          .replace(/-gu/g, '')
          .toLowerCase(); // 현재 geojson의 지역 이름을 조정함
        return colorScale(data[districtName] || 0); // 지역구의 값에 따라서 색상을 결정함
      })
      .style('stroke', '#000000');
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`${endpoint}${id}`);
        setData(handleMapData(res.data));
      } catch (err) {
        console.log('지도데이터를 불러오는데 실패.');
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [endpoint, id]);

  useEffect(() => {
    if (!isFetching) {
      createMap();
    }
  }, [isFetching, createMap]);

  if (isFetching) {
    return <div>로딩중</div>;
  }
  return <svg ref={svgRef} width={800} height={600}></svg>;
};
