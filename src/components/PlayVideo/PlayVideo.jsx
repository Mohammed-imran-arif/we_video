import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import { assets } from '../../assets/assets'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = (props) => {

  const {videoId} = props       // here props or useParams use panni videoId destructer panna mattum tha recommond video clicking dynamic ah erukum otherwise direct ah ({videoId}) kudutha varathu

  const [apiData,setApidata]= useState(null)  // <== video data store ku state create panni erukom
  const [channelData,setChannelData] = useState(null)  // <== channel data store ku state create panni erukom
  const [commentData,setCommentData]=useState([])

  const fetchVideoData = async()=>{

    //fetching video data        youtube >dataApi > video > list (by videoId)
    //ethu la video related ah all details erukum but channel details erukathu except channel name, channel id 
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(Response=>Response.json()).then(data=>setApidata(data.items[0]))
  }
  
    //fetching channel data        youtube >dataApi > channels > list (by channelId)
    // ethula apiData^ channel id eruku atha vachi fetch pannanum 
  const fetchChannelData= async()=>{
      const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
      await fetch(channelData_url).then(Response=>Response.json()).then(data=>setChannelData(data.items[0]))
    
      // Fetching real comment data using vedioId
      const commentData_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
      await fetch(commentData_url).then(Response=>Response.json()).then(data=>setCommentData(data.items))
  } 
   


  useEffect(()=>{
    fetchVideoData();
  },[videoId])
  
  useEffect(()=>{
    fetchChannelData();
  },[apiData])


  

  return (
    <div className="play-video">
      {/* <video src={assets.video} controls autoPlay muted ></video> */}
      <iframe src= {`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title:""}</h3>
      <div className="play-video-info">
        <p>{apiData?value_converter(apiData.statistics.viewCount):""} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():''}</p>
     <div>
        <span><img src={assets.like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):''}</span>
        <span><img src={assets.dislike} alt="" /></span>
        <span><img src={assets.share} alt="" />Share</span>
        <span><img src={assets.save} alt="" />Save</span>
      </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.medium.url:""} alt="" />
        <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData?(apiData.snippet.description).slice(0,250):"description here"}</p>
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):""} Comments</h4>
        
     {commentData.map((item,index)=>{
      return(
          <div className="comments" key={index}>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={assets.like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={assets.dislike} alt="" />
                </div>
              </div>
            </div>
        )})}
          
        
    
      </div>
    </div>
  )
}

export default PlayVideo