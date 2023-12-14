import { ChangeEvent, useState } from 'react';

function FileUploadSingle({ getUploadedFiles }: {getUploadedFiles: any}) {
  const [file, setFile] = useState<File>();
  const [status, setStatus] = useState<string>('Выберите файл');
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setStatus('Файл выбран');
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append(`image`, file, file.name);
    fetch('http://localhost:8088/' + "api/file", {
      method: 'POST',
      body: data,
    })
    .then(async (res) => {
        const js = await res.json();
        const filesUp = js.generatedMaps.map((fl:any) => fl.id);
        getUploadedFiles(filesUp[0]);
        setStatus('Файл успешно загружен');
        })
      .then((data) => console.log(data))
      .catch((err) => {
        setStatus('Ошибка загрузки файла');
        console.error(err)
      });
  };

  return (
    <div>
        {status}
      <input type="file" onChange={handleFileChange} />
      <div>{file && `${file.name} - ${file.type}`}</div>

      <button className ="button-grey" onClick={handleUploadClick}>Загрузить</button>
    </div>
  );
}

export default FileUploadSingle;