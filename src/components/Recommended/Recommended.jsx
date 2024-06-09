import React, { useEffect,useState } from 'react'
import './Recommended.css'
import { assets } from '../../assets/assets'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'

const Recommended = ({categoryId}) => {
    
    // same feed.jsx and recommended.jsx both are using same most popular video based on category 
    
    const[apiData,setApidata]=useState([])

    const fetchData = async()=>{

        //fetching mostpoular video then store to above stateArray        youtube >dataApi > video > list (by most popular video)

       const videoList_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
       await fetch(videoList_url).then(Response=>Response.json()).then(data=>setApidata(data.items))
   }

   useEffect(()=>{
        fetchData()
   },[])
  

  return (
    <div className="recommended">
         {apiData.map((item,index)=>{
            return(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`}  className="side-video-list" key={index}>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </div>
                </Link>
        
            )
        })} 
        
    </div>
  )
}

export default Recommended