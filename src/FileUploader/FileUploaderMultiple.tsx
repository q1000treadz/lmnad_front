import { ChangeEvent, useState } from 'react';

function FileUploadMultiple({ getUploadedFiles }: {getUploadedFiles: any}) {
  const [fileList, setFileList] = useState<any>(null);
  const [status, setStatus] = useState<string>('Выберите файлы');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus('Файлы выбраны');
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`image`, file, file.name);
    });

    // 👇 Uploading the files using the fetch API to the server
    fetch(process.env.REACT_APP_BACKEND_URL + "/file", {
      method: 'POST',
      body: data,
    })
      .then(async (res) => {
      const js = await res.json();
      const filesUp = js.generatedMaps.map((fl:any) => fl.id);
      getUploadedFiles(filesUp);
      setStatus('Файлы успешно загружены');
      })
      .then((data) => console.log(data))
      .catch((err) => {
        setStatus('Ошибка загрузки файлов');
        console.error(err)
      });
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  return (
    <div>
              {status}
      <input type="file" onChange={handleFileChange} multiple />

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>

      <button className ="button-grey" onClick={handleUploadClick}>Загрузить</button>
    </div>
  );
}

export default FileUploadMultiple;