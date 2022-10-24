import React from "react"
import { NavLink } from "react-router-dom"
import { charClassTitles } from "../classes/charInfo"

const CharSheetNavBar = ({ charState }) => (

    <div>
        {charState.changeClass && (
            <nav>
                {charClassTitles.map((title) => {
                    return (
                        <NavLink
                            key={title}
                            to={title}
                            className={isActive =>
                                (isActive ? "active" : "")}
                        >{title}</NavLink>
                    )
                })}
            </nav>
        )}
    </div>

)

export default CharSheetNavBar