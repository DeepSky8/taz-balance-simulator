import React from "react";
import EditKostco from "./EditKostco";

const DisplayKostcos = ({ kostcoArray }) => {


  return (
    <div className="kostcoFlexContainer">
      {kostcoArray.map(kard => {
        return (
          <EditKostco
            key={kard.kID}
            kard={kard}
          />)
      })}
    </div>
  )
}

export default DisplayKostcos