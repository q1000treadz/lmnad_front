import React, { useEffect, useState } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';
import { WaveRecordType } from './types/Record';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import './Record.css'
import FileUploadMultiple from '../FileUploader/FileUploaderMultiple';
//import "react-select/dist/react-select.css";


const RecordUploadForm = ({ getDataSetter }: {getDataSetter: any}) => {
  
  
  const initValues: WaveRecordType = { latitude: 0, longitude: 0, information: '', start_date: new Date(), end_date: new Date(), wave_types: [], scale: '', weather: '', source_generation:'', files: [] };

  const [formFields, setFormFields] = useState([
    {...initValues},
  ]);

  useEffect(() => {
    // Only way to use a state for a function, because the setter function
    // can take a callback to set the new value
    getDataSetter(() => () => formFields);
  }, [formFields]);

  const filterOptions: any =  [
    { value: 'edge', label: "Edge"},
    { value: "shelf", label: "Shelf" },
    { value: "kelvin", label: "Kelvin" },
    { value: "puankare", label: "Puankare" }
  ];

  const handleFormChange = (event:any, index:number) => {
    let data: any = [...formFields];
    const key  = event.target.name;
    data[index][key] = event.target.value;
    setFormFields(data);
  }
  const handleDateChange = (event:any, date: any, index:number) => {
    let data: any = [...formFields];
    data[index][event] = date; 
    setFormFields(data);
  }
  const handleWavesTypeChange = (event:any,index:number) => {
    console.log(event)
    let data: any = [...formFields];

    data[index]['wave_types'] = event;
    setFormFields(data);
  }

  const submit = (e: any) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {...initValues};
    setFormFields([...formFields, object])
  }

  const removeFields = (index: any) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const getUploadedFiles = (index: any, fldata: any) => {
    let data = [...formFields];
    console.log(index, fldata)
    data[index]['files'] = fldata;
    setFormFields(data);
  }

  return (
    <div className='source-form'>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
            {"Наблюдение: " + (index + 1)}
            <div className='form-fields'>
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Широта</label>
              <input
                className="text-field__input"
                id='latitude'
                name='latitude'
                placeholder='latitude'
                onChange={event => handleFormChange(event, index)}
                value={form.latitude}
              />
              </div>
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Долгота</label>

              <input
                className="text-field__input"
                name='longitude'
                placeholder='longitude'
                onChange={event => handleFormChange(event, index)}
                value={form.longitude}
              />
              </div>
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Информация</label>
              <textarea 
                name = "information"
                placeholder='information'
                onChange={event => handleFormChange(event, index)}
                value = {form.information}
              />
              </div>
              <div>
              <label className="text-field__label" htmlFor="latitude">Дата начала наблюдения</label>
              <DatePicker selected={form.start_date} onChange={(event: any) => handleDateChange('start_date', event, index)} />
              </div>
              <div>
              <label className="text-field__label" htmlFor="latitude">Дата окончания наблюдения</label>
              <DatePicker selected={form.end_date} onChange={(event: any) => handleDateChange('end_date', event, index)} />
              </div>
              <div>
              <label className="text-field__label" htmlFor="latitude">Тип волн</label>
            <Select
              name="filters"
                placeholder="Filters"
                value={form.wave_types}
                options={filterOptions}
                onChange={event => handleWavesTypeChange(event, index)}
                isMulti
              />
             </div>
             <div className="text-field">
             <label className="text-field__label" htmlFor="latitude">Масштаб</label>
              <input
                className="text-field__input"
                name='scale'
                placeholder='scale'
                onChange={event => handleFormChange(event, index)}
                value={form.scale}
              />
              </div>
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Погода</label>
              <input
                className="text-field__input"
                name='weather'
                placeholder='weather'
                onChange={event => handleFormChange(event, index)}
                value={form.weather}
              />
              </div>
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Причина образования</label>
              <input
                className="text-field__input"
                name='source_generation'
                placeholder='source_generation'
                onChange={event => handleFormChange(event, index)}
                value={form.source_generation}
              />
              <h3>Выберите файлы</h3>
              <FileUploadMultiple getUploadedFiles={(data:any) => getUploadedFiles(index, data)} />
              <button className ="button-grey" onClick={() => removeFields(index)}>Удалить</button>
              </div>
            </div>
            </div>
          )
        })}
      </form>
      <button className ="button-grey" onClick={addFields}>Еще одно наблюдение...</button>
      <br />
    </div>
  );
};

export default RecordUploadForm;
