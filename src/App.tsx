import { ChangeEvent , MouseEvent} from 'react';
import { useState } from 'react';
import { FaYoutube } from "react-icons/fa";
import axios from 'axios';

function App() {
  const [url ,setUrl] = useState('')
  const [urlCheck,setUrlChecK]  = useState(''); // for show the errer msg in response

  const handleUrl  =(e:ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setUrl(e.target.value);
  };
  
  const downloadSong =async(e:MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      
      const options = {
         method: 'GET',
         url: 'https://youtube-data8.p.rapidapi.com/video/streaming-data/',
         params: {id: url},
         headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
          'x-rapidapi-host': 'youtube-data8.p.rapidapi.com',
          'content-type': 'application/json',
        }
      };

        try {
          const response = await axios.request(options);
          console.log(response.data);

          if(response.data.success === true){
            window.location.href = response?.data?.formats[Number(0)]?.url
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
        <FaYoutube  color='red' size={80}/>
        <p className = 'text-2xl'>Youtube video downloader</p>
        <label>Paste the video link below</label>
        <input type='url' value = {url} onChange={handleUrl} className="h-8 w-1/2 border-none outline-none rounded"/>
        <button type='submit' onClick={downloadSong} className="px-2 border-solid border-gray-700 border-2 rounded hover:bg-gray-600 hover:text-black">Download</button>
        {urlCheck && <p className='px-2 text-white bg-red-400 rounded '>{urlCheck}</p>}
      </div>
    </div>
  )
}

export default App 
