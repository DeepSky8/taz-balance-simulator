import React from "react";
import { useReducer } from "react";
import { defaultKostcoState, kostCoReducer } from "../../../reducers/kostcoReducer";

const NewKostco = () => {
  const [kostcoState, dispatchKostcoState] = useReducer(kostCoReducer, defaultKostcoState)

  return (
    <div>

    </div>
  )
}

export default NewKostco