import React from "react";
import { Outlet } from "react-router-dom";
import LeftMenuContainer from "./Menu/LeftMenuContainer";


const Home = () => {



  return (
    <div>
      <LeftMenuContainer />
      <div id="outerEdge">
        <Outlet />
      </div>
    </div>
  )
}

export default Home