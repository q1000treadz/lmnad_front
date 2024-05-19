import { YMaps, Clusterer, Map } from "@pbe/react-yandex-maps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MapPlacemark from "../MapPlacemark/MapPlacemark";
import { useSearchParams } from "react-router-dom";
import "./RecordsMap.css"

const BUTTONS = [
  { id: 123, title: 'Краевые', slug: 'edge', selected: true , color: 'green'},
  { id: 456, title: 'Шельфовые', slug: 'shelf', selected: true, color: 'blue' },
  { id: 789, title: 'Кельвин', slug: 'kelvin', selected: true, color: 'red' },
  { id: 800, title: 'Пуанкаре', slug:'poincare', selected: true, color: 'yellow' },
];


const RecordsMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [buttons, setButtons] = useState(BUTTONS);
  const handleButton = (buttonId: number) => {
    const newButtons = buttons.map((btn) => {
      if (btn.id !== buttonId) return btn;
      btn.selected = !btn.selected;
      return btn;
    });
    setButtons(newButtons);
  };
  
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
      
      <MapPlacemark wave_types={buttons.filter(b => b.selected).map(b => b.slug)} source_id={searchParams.get("source_id")}/>
    </Clusterer>
    </Map>
    </div>
  </YMaps>
  
  <div className="green-square"></div><div style={{display: 'inline-block'}}> Краевые</div>
  <div className="blue-square"></div>Шельфовые
  <div className="red-square"></div>Кельвин
  <div className="yellow-square"></div>Пуанкаре

  <div>
        {buttons.map((bt) => (
          <button
            key={bt.id}
            onClick={() => handleButton(bt.id)}
            style={bt.selected ? {backgroundColor: bt.color, width: '100px', height:'50px'} : {width: '70px', height:'50px', backgroundColor: ''}}
          >
            {bt.title}
          </button>
        ))}
      </div>
  </>
    );
};

export default RecordsMap;


