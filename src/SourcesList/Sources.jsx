import React from 'react'
import "./Sources.css"
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
const Records = ({data}) => {
    
  return (  
    <table className="table-sources">
        <thead>
            <tr>
                <th scope='col'>Doi</th>
                <th scope='col'>Полное описание</th>
                <th scope='col'></th>

            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr style={{height:'7%'}}>
                    <td style={{width: '30%'}}>{item.doi} </td>
                    <td style={{width: '50%'}}>{item.bibliographic_reference_harvard} </td>
                    <td style={{width: '20%'}}> <Link
      to={{
        pathname: '/map',
        search: `?source_id=${item.id}`,
      }}
    >На карте
    </Link></td>
                </tr>
            ))}
        </tbody>
    </table>
  ) 
}

export default Records  