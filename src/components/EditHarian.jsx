import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditHarian = () => {
    const [judul, setJudul] = useState("");
    const [catat, setCatat] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const getHarianByID = async () =>{
            const response = await axios.get(`http://localhost:5000/harian/${id}`);
            setJudul(response.data.judul);
            setCatat(response.data.catat);
        };
        getHarianByID();
    },[id]);

    const updateHarian = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/harian/${id}`, {
            judul: judul,
            catat: catat
        });
        navigate("/");
    }

  return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow 
    shadow-slate-300'>
        <form onSubmit={updateHarian} className='my-10'>
            <div className="flex flex-col">
                <div className="mb-5">
                    <label className="font-bold text-slate-700">Judul</label>
                    <input type="text" className='w-full py-3 mt-1 border border-slate 200
                    rounded-lg px-3 focus:outline-none focus:border-slate-500
                    hover:shadow'
                    placeholder='Judul Catatanmu'
                    value={judul}
                    onChange={(e)=>setJudul(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="font-bold text-slate-700">Catatan</label>
                    <input type="text" className='w-full py-3 mt-1 border border-slate 200
                    rounded-lg px-3 focus:outline-none focus:border-slate-500
                    hover:shadow'
                    placeholder='Tulis Catatanmu'
                    value={catat}
                    onChange={(e)=>setCatat(e.target.value)}/>
                </div>
                <button type="submit" className='w-full py-3 font-bold text-white bg-indigo-600
                hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default EditHarian