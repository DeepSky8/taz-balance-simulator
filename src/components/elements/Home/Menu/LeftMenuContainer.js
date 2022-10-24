import React, { useState } from "react";
import MenuButton from "./MenuButton";
import MenuContents from "./MenuContents";

const LeftMenuContainer = () => {


  window.addEventListener('click', (event) => {

    if (!event.target.classList.contains('menuButton')) {
      const currentClassList = document.getElementById('leftMenuContainer').classList
      if (currentClassList.contains('show')) {
        currentClassList.remove('show')
        currentClassList.add('hide')
      }
    }
  })



  const toggleLeftMenu = () => {

    const currentClassList = document.getElementById('leftMenuContainer').classList

    if (currentClassList.contains('show')) {
      currentClassList.remove('show')
      currentClassList.add('hide')
    } else if (currentClassList.contains('hide')) {
      currentClassList.remove('hide')
      currentClassList.add('show')
    }

  }




  return (
    <div
      id="leftMenuContainer"
      className="hide"
    >
      <div id="leftMenuButtonContainer"
        className="menuButtonContainer"
      >
        <MenuButton
          handleClick={toggleLeftMenu}
        />
      </div>

      <div
        id="leftMenuContents"

      >
        <MenuContents />
      </div>

    </div>

  )
}

export default LeftMenuContainer


// window.addEventListener("click", function(event){
//   if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//           var openDropdown = dropdowns[i];
//           if (openDropdown.classList.contains('show')) {
//               openDropdown.classList.remove('show');
//           }
//       }
//   }
// })