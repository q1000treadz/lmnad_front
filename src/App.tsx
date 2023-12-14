import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import MapPlacemark from './MapPlacemark/MapPlacemark';
import SourceUploadForm from './SourceUploadForm/SourceUploadForm';
import RecordUploadForm from './RecordUploadForm/RecordUploadForm';
import DataUploader from './DataUploader/DataUploader';
import { AppSectionEnum } from './App.enum';

const App = () => {

  const [section, setSection] = useState(AppSectionEnum.MAP);
  const handleButtonClick = (section: AppSectionEnum) => {
    setSection(section);
  }
return (
  <div>
    <button className ="button-grey" onClick={() => handleButtonClick(AppSectionEnum.MAP)}>Карта</button>
    <button className ="button-grey" onClick={() => handleButtonClick(AppSectionEnum.ADD_PLACEMENT)}>Добавить наблюдение</button>
    {section === AppSectionEnum.ADD_PLACEMENT ?
  <><DataUploader /></>
  :
  <YMaps>
    <div>
      
      <Map
       width={1000} height={700} defaultState={{ 
        type: "yandex#satellite", center: [40.75, 37.57], zoom: 2 }}          	
       modules={ [ 'geoObject.addon.balloon', 'geoObject.addon.hint' ] }>
      <MapPlacemark /></Map>
    </div>
  </YMaps>
  }
  </div>
)
};

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
function setState(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}

