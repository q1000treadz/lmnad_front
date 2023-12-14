import SourceUploadForm from '../SourceUploadForm/SourceUploadForm';
import RecordUploadForm from '../RecordUploadForm/RecordUploadForm';
import { useState } from 'react';
import axios from 'axios';

const DataUploader = () => {
    const [data, setData] = useState('');
    const [getSourceData, setGetSourceData] = useState(() => null);

    const handleSourceData = () => {
        return (getSourceData as any)();
    };

    const [getRecordData, setGetChildData] = useState(() => null);
    const [text, setText] = useState('Нажми');
    const handleRecordData = () => {
      return (getRecordData as any)();
    };
    const handleChildData = () => {
        const records = handleRecordData();
        const source = handleSourceData();
        console.log(records, source)
        const withRecordsData = {
          source: source,
          records: records.map((rr: any) => {
            return {...rr, latitude: +rr.latitude, longitude: +rr.longitude, wave_types: rr.wave_types.map((wt: any) => wt.value).join(','), 
            file_records: rr.files.map((fl: any)=> {
              return {
                file_id: fl,
                file_type: 'map'
              }
            })}
          })
        };
        axios
        .post('http://localhost:8088' + "/api/source/withRecords", withRecordsData)
        .then((res) => {
          console.log(res)
          setText('Успешно добавлено')
        }).catch(e => {
          setText(JSON.stringify(e));
        });
    };
  return (<><SourceUploadForm getDataSetter={setGetSourceData} /><RecordUploadForm  getDataSetter={setGetChildData} />
  {text}
  <div>
    <button className ="button-grey" onClick={() => handleChildData()}>Добавить</button>
    </div>
  </>);
}

export default DataUploader;