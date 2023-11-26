import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WaveSourceType } from './types/Source';

const SourceUploadForm = ({ getDataSetter }: {getDataSetter: any}) => {
     const initValues: WaveSourceType = { doi: '', bibliographic_reference_harvard: '', publish_date: new Date() };
     const [formFields, setFormFields] = useState(initValues);
     useEffect(() => {
      // Only way to use a state for a function, because the setter function
      // can take a callback to set the new value
      getDataSetter(() => () => formFields);
    }, [formFields]);

    const handleFormChange = (event:any) => {
      let data: any = {...formFields};
      const key  = event.target.name;
      data[key] = event.target.value;
      setFormFields(data);
    }

    const handleDateChange = (event:any, date: any) => {
      let data: any = {...formFields};
      data[event] = date; 
      setFormFields(data);
    }
  return (
  <>
  <div>
              <input
                name='doi'
                placeholder='doi'
                onChange={event => handleFormChange(event)}
                value={formFields.doi}
              />
              </div>
 
              <div>
              <input
                name='bibliographic_reference_harvard'
                placeholder='bibliographic_reference_harvard'
                onChange={event => handleFormChange(event)}
                value={formFields.bibliographic_reference_harvard}
              />
              </div>
              <DatePicker selected={formFields.publish_date} onChange={(event: any) => handleDateChange('publish_date', event)} />

     
 </>
 )
};

export default SourceUploadForm;
// public publish_date: Date;
// public doi: string;
// public bibliographic_reference_harvard: string;