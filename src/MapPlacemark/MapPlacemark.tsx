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
            const placemarks: any[] = res.data.map((pm: { latitude: number; longitude: number; information: string; }) => {
                return {
                    latitude: pm.latitude,
                    longitude: pm.longitude,
                    information: pm.information,
                };
            })
            setData(placemarks);
        })
    }, [])
  
    return (
        <>
        {data.length > 0 && 
          data.map(pm => {
            return <Placemark geometry={ [pm.latitude,pm.longitude] }
            options={
              {
                preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                iconColor: 'green', // цвет иконки, можно также задавать в hex
              } }
            properties={
              {
              iconContent: '2',
              hintContent: '<b> Я появляюсь при наведении на метку </b>',
              balloonContent: pm.information,
                 }	}/>
          })
        }
        </>
    );
};

export default MapPlacemark;
