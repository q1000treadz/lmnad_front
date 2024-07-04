import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"
import Pagination from "./Pagination"
import Records from "./Sources"

const SourcesList = () => {
    const [data, setData] = React.useState([] as any[])
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [suggestion, setSuggestion] = useState('');
    const [recordsPerPage] = useState(10);
    const findSources = () =>{
        let url = process.env.REACT_APP_BACKEND_URL + "/source";
        if(suggestion) {
            url += `?suggestion=${suggestion}`;
        }
        axios
        .get(url)
        .then((res) => {
            console.log(suggestion, res.data)
            const placemarks: any[] = res.data.map((pm: {  bibliographic_reference_harvard: string; doi: string; id:number;}) => {
                return {
                    bibliographic_reference_harvard: pm?.bibliographic_reference_harvard,
                    doi: pm?.doi,
                    id: pm?.id,
                };
            })
            setData(placemarks);
            setLoading(false);
        })
    }
    useEffect(() => {
        findSources();
    }, [])

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSuggestion(event.target.value);
      }
    
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        findSources();
        console.log(`Searching for ${suggestion}...`);
      }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)
    let page;  
    if(loading) {
        page = <>"wait"
        <input type="text" value={suggestion} onChange={handleChange} />
        <button onClick={(event) => handleSubmit(event)}>Search</button></>;
      } else {
        page =<><div className='container mt-5'>
                <h2> Список источников </h2>
                <Records data={currentRecords} />
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </div>
            <div className="search-container">
    <input type="search" value={suggestion} onChange={handleChange} placeholder="Search..." />
    <button className="button-style" onClick={(event) => handleSubmit(event)}>Поиск</button>

        </div>
            {/* <input style={{width: '150px', height: '60px'}} type="text" value={suggestion} onChange={handleChange} />
            <button style={{width: '60px', height: '60px'}} onClick={(event) => handleSubmit(event)}>Поиск</button> */}
            </>
      }
    return (
        {...page}
    );
}

export default SourcesList