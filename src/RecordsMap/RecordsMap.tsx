import { YMaps, Clusterer, Map } from "@pbe/react-yandex-maps";
import axios from "axios";
import React, { useEffect } from "react";
import MapPlacemark from "../MapPlacemark/MapPlacemark";
import { useSearchParams } from "react-router-dom";

const RecordsMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("source_id")
    return (
        <>
          <YMaps>
    <div>
      
      <Map
       width={1000} height={700} defaultState={{ 
        type: "yandex#satellite", center: [40.75, 37.57], zoom: 2 }}          	
       modules={ [ 'geoObject.addon.balloon', 'geoObject.addon.hint' ] }>
      <Clusterer
        options={{
          
          preset: "islands#invertedVioletClusterIcons",
          groupByCoordinates: false,
        }}
      >
      
      <MapPlacemark source_id={searchParams.get("source_id")}/>
    </Clusterer>
    </Map>
    </div>
  </YMaps>
  
  <div className="green-square"></div><div style={{display: 'inline-block'}}> Краевые</div>
  <div className="blue-square"></div>Шельфовые
  <div className="red-square"></div>Кельвин
  <div className="yellow-square"></div>Пуанкаре
  </>
    );
};

export default RecordsMap;


