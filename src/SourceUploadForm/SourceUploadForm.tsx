import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WaveSourceType } from './types/Source';
import axios from 'axios';
import './Source.css';
import FileUploadSingle from '../FileUploader/FileUploaderSingle';

const SourceUploadForm = ({ getDataSetter }: {getDataSetter: any}) => {
     const initValues: WaveSourceType = { doi: '', bibliographic_reference_harvard: '', publish_date: new Date(), file_id: ''};
     const [formFields, setFormFields] = useState(initValues);
    const [selectedFile, setSelectedFile] = useState(null);

	// On file select (from the pop up)
	 const onFileChange = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	// On file upload (click the upload button)
	const onFileUpload = () => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"image",
			selectedFile as any,
			(selectedFile as any).name
		);

		// Details of the uploaded file
		console.log(selectedFile);

		// Request made to the backend api
		// Send formData object
		axios.post('http://localhost:8088/' + "api/file", formData).then(res => {
      if(res.status>=200 && res.status<300) {
        let data: any = {...formFields};
        console.log(res.data)
        data['file_id'] = res.data.identifiers[0].id;
        console.log(data);
        setFormFields(data);
      }
    });
	};

	// File content to be displayed after
	// file upload is complete
	const fileData = () => {
		if (selectedFile) {
			return (
				<div>
					<h2>File Details:</h2>
					<p>
						File Name:{" "}
						{(selectedFile as any)?.name}
					</p>

					<p>
						File Type:{" "}
						{(selectedFile as any)?.type}
					</p>

					<p>
						Last Modified:{" "}
						{(selectedFile as any)?.lastModifiedDate?.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>
						Choose before Pressing the Upload
						button
					</h4>
				</div>
			);
		}
	};

	

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

	const getUploadedFiles = ( fldata: any) => {
		let data = initValues;
		console.log(fldata)
		data['file_id'] = fldata;
		setFormFields(data);
	  }
  return (
    <div className='source-form'>
		<div className='form-fields'>
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">DOI:</label>
              <input
                className="text-field__input"
                name='doi'
                placeholder='doi'
                onChange={event => handleFormChange(event)}
                value={formFields.doi}
              />
              </div>
 
              <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Библиографическая ссылка(Гарвард)</label>
              <input
                className="text-field__input"
                name='bibliographic_reference_harvard'
                placeholder='bibliographic_reference_harvard'
                onChange={event => handleFormChange(event)}
                value={formFields.bibliographic_reference_harvard}
              />
              </div>
			  <div className="text-field">
              <label className="text-field__label" htmlFor="latitude">Дата публикации</label>
              <DatePicker className='div-input' selected={formFields.publish_date} onChange={(event: any) => handleDateChange('publish_date', event)} />
				</div>
			<div>
				<h3>Выберите файл источника(pdf)</h3>
				<FileUploadSingle getUploadedFiles={(data:any) => getUploadedFiles(data)}/>
			</div>
			</div>
 </div>
 )
};

export default SourceUploadForm;
// public publish_date: Date;
// public doi: string;
// public bibliographic_reference_harvard: string;