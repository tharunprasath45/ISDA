import React from 'react'
import { renderheader, header } from '../../components/Dashboardcontent';

function Applicants() {
      const updateskills = header.map((intro) => {
        if (intro.dashboard === "Dashboard") return { dashboard: "Applicants" };
        return intro;
      });
  return (
    <div>
      {renderheader(updateskills)}
    </div>
  )
}

export default Applicants
