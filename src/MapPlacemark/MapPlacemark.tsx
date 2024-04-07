import React, { useEffect } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

const MapPlacemark = ({source_id} : {source_id: string | null;}) => {
    const [data, setData] = React.useState([] as any[])
    const iconColor: Record<string, string> = {
      'edge': 'green',
      'shelf': 'blue',
      'kelvin': 'red',
      'poincare': 'yellow'
    }
    useEffect(() => {
      let url = 'http://localhost:8088' + "/api/record";
      if(source_id) {
        url+=`?source_id=${source_id}`;
      }
      axios
        // .get(process.env.BACKEND_URL + "/api/record")
        .get(url)
        .then((res) => {
            console.log(res.data)
            const placemarks: any[] = res.data.map((pm: { wave_types: string; latitude: number; longitude: number; information: string;source: any; record_files: any[]; }) => {
              console.log(pm.wave_types)  
              return {
                    latitude: pm.latitude,
                    longitude: pm.longitude,
                    information: pm.information,
                    bibliographic_reference_harvard: pm?.source?.bibliographic_reference_harvard,
                    source: pm?.source,
                    record_files: pm?.record_files,
                    wave_types: pm?.wave_types,
                };
            })
            setData(placemarks);
        })
    }, [])
  
    return (
        <>
        {data.length > 0 && 
          data.map((pm, index) => {
            return <Placemark key={index} geometry={ [pm.latitude,pm.longitude] }
            options={
              {
                preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                iconColor: iconColor[pm?.wave_types] || 'black', // цвет иконки, можно также задавать в hex
              } }
            properties={
              {
              iconContent: '',
              hintContent: `<b>${pm.information}</b>`,
              balloonContent: `<div>${pm.information}</div>
              <div>${pm.bibliographic_reference_harvard}</div>
              <img src="${'http://localhost:8088/' + pm?.record_files?.[0]?.file?.url}" width="200px" height="200px" />
              <div>${pm?.latitude?.toFixed(3)}, ${pm?.longitude?.toFixed(3)}`,
                 }	}/>
          })
        }
        </>
    );
};

export default MapPlacemark;
