import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import MapPlacemark from './MapPlacemark/MapPlacemark';
import SourceUploadForm from './SourceUploadForm/SourceUploadForm';
import RecordUploadForm from './RecordUploadForm/RecordUploadForm';
import DataUploader from './DataUploader/DataUploader';
import { AppSectionEnum } from './App.enum';
import SourcesList from './SourcesList/SourcesList';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import RecordsMap from './RecordsMap/RecordsMap';

// const App = () => {

//   const [section, setSection] = useState(AppSectionEnum.MAP);
//   const handleButtonClick = (section: AppSectionEnum) => {
//     setSection(section);
//   }
// return (
//   <div>
//     <button className ="button-grey" onClick={() => handleButtonClick(AppSectionEnum.MAP)}>Карта</button>
//     <button className ="button-grey" onClick={() => handleButtonClick(AppSectionEnum.ADD_PLACEMENT)}>Добавить наблюдение</button>
//     <button className ="button-grey" onClick={() => handleButtonClick(AppSectionEnum.RECORDS)}>Список источников</button>

//     {section === AppSectionEnum.ADD_PLACEMENT ?
//   <><DataUploader /></>
//   : section === AppSectionEnum.MAP ?
//   <YMaps>
//     <div>
      
//       <Map
//        width={1000} height={700} defaultState={{ 
//         type: "yandex#satellite", center: [40.75, 37.57], zoom: 2 }}          	
//        modules={ [ 'geoObject.addon.balloon', 'geoObject.addon.hint' ] }>
//       <Clusterer
//         options={{
          
//           preset: "islands#invertedVioletClusterIcons",
//           groupByCoordinates: false,
//         }}
//       >
      
//       <MapPlacemark />
//     </Clusterer>
//     </Map>
//     </div>
//   </YMaps> : <SourcesList />}
//   </div>
  
// )
// };

function App() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <nav>
        <ul>
        <button className ="button-grey"  onClick={() => navigate("/map")}>Карта</button>
        <button className ="button-grey" onClick={() => navigate("/add")}>Добавить наблюдение</button>
        <button className ="button-grey" onClick={() => navigate("/sources")}>Список источников</button>
        </ul>
      </nav>

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<RecordsMap />} />
        <Route path="/map" element={<RecordsMap />} />
        <Route path="/add" element={<DataUploader />} />
        <Route path="/sources" element={<SourcesList />} />
      </Routes>
    </div>
  );
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

