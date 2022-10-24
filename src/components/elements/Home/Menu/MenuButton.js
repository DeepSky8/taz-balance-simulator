import React from "react";
import transparentButton1 from '../../../../gameImages/TransparentButton1.png'
// import transparentButton2 from '../../../../gameImages/TransparentButton2.jpg'

const MenuButton = ({ handleClick }) => {

  return (
    <button
      className="menuButton"
      onClick={() => { handleClick() }}
    >
      <img
        src={transparentButton1}
        className='menuButton'

      />
    </button>
  )
}

export default MenuButton

// height={50}
// width={50}