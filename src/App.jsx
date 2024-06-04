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
import { Routes, Route, useNavigate, Navigate  } from 'react-router-dom';
import RecordsMap from './RecordsMap/RecordsMap';
import Login from './Login/Login';
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
// };localStorage.getItem('token')
const ProtectedRoute = ({ children }) => {
  
  const navigate = useNavigate()
  if (!localStorage.getItem('token')) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <><nav>
        <ul>
        <button className ="button-grey" onClick={() => navigate("/map")}>Карта</button>
        <button className ="button-grey" onClick={() => navigate("/add")}>Добавить наблюдение</button>
        <button className ="button-grey" onClick={() => navigate("/sources")}>Список источников</button>
        </ul>
      </nav>
      {children}</>;
};
function App() {
  

  return (
    <div className="container">
      

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route  path="/" element={
            <ProtectedRoute>
              <RecordsMap />
            </ProtectedRoute>
          } />
        <Route  path="/map"  element={
            <ProtectedRoute>
              <RecordsMap />
            </ProtectedRoute>
          } />
        <Route  path="/add"  element={
            <ProtectedRoute>
              <DataUploader />
            </ProtectedRoute>
          } />
        <Route  path="/sources"  element={
            <ProtectedRoute>
              <SourcesList />
            </ProtectedRoute>
          } />
      </Routes>
    </div>
  );
}

export default App;

