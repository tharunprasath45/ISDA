import React from 'react'
import { renderheader, header } from './Dashboardcontent'

function Jobinsights() {
    const updateskills = header.map((intro)=>{
        if(intro.dashboard === "Dashboard") return {dashboard:'Job Insights'}
        return intro
    })
  return (
    <div className='total-width-1'>
        <div>{renderheader(updateskills)}</div>
      
    </div>
  )
}

export default Jobinsights
