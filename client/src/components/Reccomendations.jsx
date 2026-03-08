import React from 'react'
import { header, renderheader } from "./Dashboardcontent";

function Reccomendations() {
  const updateskills = header.map((intro)=>{
    if(intro.dashboard === "Dashboard") return {dashboard :"Recommendations"}
  return intro

    
  })
  return (
    <div>
      {renderheader(updateskills)}
    </div>
  )
}

export default Reccomendations
