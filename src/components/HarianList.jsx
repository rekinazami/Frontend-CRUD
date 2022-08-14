import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import useSWR, {useSWRConfig} from 'swr';

const HarianList = () => {
    const {mutate} = useSWRConfig();
    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/harian');
        return response.data;
    };
    
    const {data} = useSWR('harian', fetcher);
    if(!data) return <h2>Loading...</h2>

    const deleteHarian = async (harianID) => {
        await axios.delete(`http://localhost:5000/harian/${harianID}`);
        mutate('harian');
    }

  return (
    <div className='flex flex-col mt-5'>
        <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-200 shadow sm:items-baseline w-full rounded-lg">
    <div class="mb-2 sm:mb-0">
    <h1 className='font-medium text-gray-900'>Catatan Harian</h1>
    </div>
    <div>
        <Link to="/add" className='bg-green-500 hover:bg-green-700 border border-slate-200
        text-white font-bold py-2 px-4 rounded-lg'>Add New</Link>
    </div>
</nav>
        <div className="w-full">
            
            <div className="relative shadow rounded-lg mt-3">
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                        <tr>
                            <th className='py-3 px-1 text-center'>No</th>
                            <th className='py-3 px-6'>Judul</th>
                            <th className='py-3 px-6'>Catatan</th>
                            <th className='py-3 px-1 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((harian, index) => (
                            <tr className='bg-white border-b' key={harian.id}>
                                <td className='py-3 px-1 text-center'>{index+1}</td>
                                <td className='py-3 px-6 font-medium text-gray-900'>{harian.judul}</td>
                                <td className='py-3 px-6'>{harian.catat}</td>
                                <td className='py-3 px-1 text-center'>
                                    <Link to={`/edit/${harian.id}`} className="font-medium bg-blue-400 hover:bg-blue-500 px-3
                                    py-1 rounded text-white mr-1">Edit</Link>
                                    <button onClick={() => deleteHarian(harian.id)} className="font-medium bg-red-400 hover:bg-red-500 px-3
                                    py-1 rounded text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default HarianList