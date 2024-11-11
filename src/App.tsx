import { ChangeEvent } from 'react';
import { useState } from 'react';
import { FaSpotify } from "react-icons/fa6";
import axios from 'axios';

function App() {
  const [url ,setUrl] = useState('')
  const [urlCheck,setUrlChecK]  = useState(''); // for show the errer msg in response

  const handleUrl  =(e:ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setUrl(e.currentTarget.value);
  };
  
  const downloadSong =async()=>{
      
      const options = {
        method: 'GET',
        url: 'https://youtube-data8.p.rapidapi.com/auto-complete/',
        params: {
          q: `$P#$$`,
          hl: 'en',
          gl: 'US'
        },
        headers: {
          'x-rapidapi-key': '738a5f6e7emsh597447d7fc44072p125188jsn86907d7274ee',
          'x-rapidapi-host': 'youtube-data8.p.rapidapi.com'
        }
      };

        try {
          const response = await axios.request(options);
          console.log(response.data);

          if(response.data.success === true){
             // window.Location.href = response.data.data.downLoadLink
              setUrl('')
          }else{
               setUrlChecK(response.data.message)
          }
          
        } catch (error){ 
          console.error(error);
        }
  };                           
// response.data.data.downLoadLink 
  return (
    <div className ='w-screen h-screen flex items-center justify-center bg-black'>
      <div className="w-full flex flex-col justify-center items-center text-xl gap-2 font-bold">
        <FaSpotify  color='green' size={80}/>
        <p className = 'text-2xl'> Spotify song downloader </p>
        <label>Paste the song link below</label>
        <input type='url' value = {url} onChange={handleUrl} className="h-8 w-1/2 border-none outline-none rounded"/>
        <button type='submit' onClick={downloadSong} className="px-2 border-solid border-gray-700 border-2 rounded hover:bg-gray-600 hover:text-black">Download</button>
        {urlCheck && <p className='px-2 text-white bg-red-400 rounded '>{urlCheck}</p>}
      </div>
    </div>
  )
}

export default App 
