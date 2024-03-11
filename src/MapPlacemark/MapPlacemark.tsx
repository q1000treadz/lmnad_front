import React, { useEffect } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

const MapPlacemark = () => {
    const [data, setData] = React.useState([] as any[])

    useEffect(() => {
      axios
        // .get(process.env.BACKEND_URL + "/api/record")
        .get('http://localhost:8088' + "/api/record")
        .then((res) => {
            console.log(res.data)
            const placemarks: any[] = res.data.map((pm: { latitude: number; longitude: number; information: string;source: any; record_files: any[]; }) => {
                return {
                    latitude: pm.latitude,
                    longitude: pm.longitude,
                    information: pm.information,
                    bibliographic_reference_harvard: pm?.source?.bibliographic_reference_harvard,
                    source: pm?.source,
                    record_files: pm?.record_files,
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
                iconColor: 'green', // цвет иконки, можно также задавать в hex
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
