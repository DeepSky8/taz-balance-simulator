import React, { useEffect, useState } from "react"
import {
  kFlavor,
  kOneshot,
  kOngoing,
  kTitle,
} from "../../../../actions/kostcoActions";

const KostcoText = ({ reducer, dispatchReducer, updateKard, ident, textReset }) => {
  const textAreaWidth = 30;
  const lengthCompare = 25
  const [activeTextBox, setActiveTextBox] = useState('')

  useEffect(() => {
    const ongoingTextSmall = document.getElementById("kOngoingSmall" + ident)
    if (ongoingTextSmall) {
      ongoingTextSmall.addEventListener("focus", () => {
        setActiveTextBox('kOngoing');
      })
    }
    const ongoingTextBig = document.getElementById("kOngoingBig" + ident)
    if (ongoingTextBig && activeTextBox === 'kOngoing') { ongoingTextBig.focus(); }


    const oneshotTextSmall = document.getElementById("kOneshotSmall" + ident)
    if (oneshotTextSmall) {
      oneshotTextSmall.addEventListener("focus", () => {
        setActiveTextBox('kOneshot');
      })
    }
    const oneshotTextBig = document.getElementById("kOneshotBig" + ident)
    if (oneshotTextBig && activeTextBox === 'kOneshot') { oneshotTextBig.focus(); }


    const flavorSmall = document.getElementById("kFlavorSmall" + ident)
    if (flavorSmall) {
      flavorSmall.addEventListener("focus", () => {
        setActiveTextBox('kFlavor');
      })
    }
    const flavorBig = document.getElementById("kFlavorBig" + ident)
    if (flavorBig && activeTextBox === 'kFlavor') { flavorBig.focus(); }

  }, [activeTextBox, textReset])


  return (

    <div>
      <label htmlFor={"kTitle" + ident}>Title: </label>
      <div>
        <input
          type='text'
          id={"kTitle" + ident}
          placeholder="Kostco card title"
          size={
            29
            // reducer.kTitle.length > 20 && reducer.kTitle.length < 30
            //   ?
            //   reducer.kTitle.length
            //   :
            //   30
          }
          value={reducer.kTitle}
          onChange={(e) => {
            dispatchReducer(kTitle(e.target.value))
          }}
          onBlur={() => { updateKard() }}
        />
      </div>

      {(activeTextBox === 'kOngoing' || reducer.kOngoing.length > lengthCompare) &&
        <span>
          <label htmlFor={'kOngoingBig' + ident}>Ongoing: </label>
          <div>
            <textarea
              className='kostcoFlagBlue'
              type='text'
              id={"kOngoingBig" + ident}
              placeholder="Ongoing Effect"
              rows='4'
              cols={textAreaWidth}
              value={reducer.kOngoing}
              onChange={(e) => {
                dispatchReducer(kOngoing(e.target.value))
              }}
              onBlur={() => { setActiveTextBox(''); updateKard() }}
            />
          </div>

        </span>
      }

      {(activeTextBox !== 'kOngoing' && reducer.kOngoing.length <= lengthCompare) &&
        <span>
          <label htmlFor={"kOngoingSmall" + ident}>Ongoing: </label>
          <div>
            <input
              className='kostcoFlagBlue'
              type='text'
              id={"kOngoingSmall" + ident}
              placeholder="Ongoing Effect"
              value={reducer.kOngoing}
              onChange={(e) => {
                dispatchReducer(kOngoing(e.target.value))
              }}
              onBlur={() => { setActiveTextBox(''); updateKard() }}
            />
          </div>

        </span>
      }

      {(activeTextBox === 'kOneshot' || reducer.kOneshot.length > lengthCompare) &&
        <span>
          <label htmlFor={"kOneshotBig" + ident}>Oneshot: </label>
          <div>
            <textarea
              className="kostcoFlagGreen"
              type='text'
              id={"kOneshotBig" + ident}
              rows='4'
              cols={textAreaWidth}
              placeholder="Oneshot Effect"
              value={reducer.kOneshot}
              onChange={(e) => {
                dispatchReducer(kOneshot(e.target.value))
              }}
              onBlur={() => { setActiveTextBox(''); updateKard() }}
            />
          </div>
        </span>
      }

      {(activeTextBox !== 'kOneshot' && reducer.kOneshot.length <= lengthCompare) &&
        <span>
          <label htmlFor={"kOneshotSmall" + ident}>Oneshot: </label>
          <div>
            <input
              className='kostcoFlagGreen'
              type='text'
              id={"kOneshotSmall" + ident}
              placeholder="Oneshot Effect"
              value={reducer.kOneshot}
              onChange={(e) => {
                dispatchReducer(kOneshot(e.target.value))
              }}
              onBlur={() => { setActiveTextBox(''); updateKard() }}
            />
          </div>
        </span>
      }

      {(activeTextBox === 'kFlavor' || reducer.kFlavor.length > lengthCompare) &&
        <span>
          <label htmlFor={"kFlavorBig" + ident}>Flavor: </label>
          <div>
            <textarea
              type='text'
              id={"kFlavorBig" + ident}
              rows='4'
              cols={textAreaWidth}
              placeholder="Flavor Text"
              value={reducer.kFlavor}
              onChange={(e) => {
                dispatchReducer(kFlavor(e.target.value))
              }}
              onBlur={() => { setActiveTextBox(''); updateKard() }}
            />
          </div>

        </span>
      }

      {(activeTextBox !== 'kFlavor' && reducer.kFlavor.length <= lengthCompare) &&
        <span>
          <label htmlFor={"kFlavorSmall" + ident}>Flavor: </label>
          <div>
            <input
              type='text'
              id={"kFlavorSmall" + ident}
              placeholder="Flavor Text"
              value={reducer.kFlavor}
              onChange={(e) => {
                dispatchReducer(kFlavor(e.target.value))
              }}
              onBlur={() => { setActiveTextBox(''); updateKard() }}
            />
          </div>

        </span>
      }

    </div>
  )
}



export default KostcoText

// {(activeTextBox !== 'kOngoing' && reducer.kOngoing.length <= lengthCompare) &&
// <span>
//   <label htmlFor={"kOngoingSmall" + ident}>Ongoing: </label>
//   <div>
//     <input
//       type='text'
//       id={"kOngoingSmall" + ident}
//       placeholder="Ongoing Effect"
//       value={reducer.kOngoing}
//       onChange={(e) => {
//         dispatchReducer(kOngoing(e.target.value))
//       }}
//       onBlur={() => { setActiveTextBox(''); updateKard() }}
//     />
//   </div>

// </span>
// }