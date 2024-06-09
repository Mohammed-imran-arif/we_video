import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'


const Sidebar = ({sidebar,category,setCategory}) => {
    return (
      // youtube >dataApi > videoCategory > list  side la execute kudu tha 200 json varum athula category pathu vaikanum like 20 == gaming etc
      <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
        <div className="shortcut-links">   
              <div className={`side-link ${category===0?"active":""}`} onClick={()=>setCategory(0)} ><img src={assets.home} alt="" /><p>Home</p></div>
              <div className={`side-link ${category===20?"active":""}`} onClick={()=>setCategory(20)}><img src={assets.gameIcon} alt="" /><p>Gaming</p></div>
              <div className={`side-link ${category===2?"active":""}`} onClick={()=>setCategory(2)}><img src={assets.automobiles} alt="" /><p>Automobiles</p></div>
              <div  className={`side-link ${category===17?"active":""}`} onClick={()=>setCategory(17)} ><img src={assets.sports} alt="" /><p>Sports</p></div>
              <div className={`side-link ${category===24?"active":""}`} onClick={()=>setCategory(24)}><img src={assets.entertainment} alt="" /><p>Entertainment</p></div>
              <div className={`side-link ${category===28?"active":""}`} onClick={()=>setCategory(28)}><img src={assets.tech} alt="" /><p>Technology</p></div>
              <div className={`side-link ${category===10?"active":""}`} onClick={()=>setCategory(10)}><img src={assets.music} alt="" /><p>Music</p></div>
              <div className={`side-link ${category===22?"active":""}`}onClick={()=>setCategory(22)}><img src={assets.blogs} alt="" /><p>Blogs</p></div>
              <div className={`side-link ${category===25?"active":""}`} onClick={()=>setCategory(25)}><img src={assets.news} alt="" /><p>News</p></div>
              <hr/>
        </div>
          <div className="subscribed-list">
              <h3>SUBSCRIBED</h3>
              <div className="side-link"><img src={assets.jack} alt="" /><p>PewDiePie</p></div>
              <div className="side-link"><img src={assets.simon} alt="" /><p>MrBeast</p></div>
              <div className="side-link"><img src={assets.tom} alt="" /><p>Justin Bieber</p></div>
              <div className="side-link"><img src={assets.megan} alt="" /><p>5-Minute Crafts</p></div>
              <div className="side-link"><img src={assets.cameron} alt="" /><p>Nas Daily</p></div>
          </div>
      </div>
    )
  }
  
  export default Sidebar