import { onValue, ref } from "firebase/database";
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../../firebase/firebase";
import { defaultKostcoCardState } from "../../../../reducers/kostcoCardReducer";
import { defaultKostcoSearchState, kostcoSearchReducer } from "../../../../reducers/kostcoSearchReducer";
import KostcoUpdatesRouter from "../../../../routers/KostcoUpdatesRouter";
import { adminAccess } from "../lincolnLogs";

const KostcoUpdates = () => {
  let navigate = useNavigate()
  const [kostcoSearch, dispatchKostcoSearch] = useReducer(kostcoSearchReducer, defaultKostcoSearchState)
  const [kostcoUnfiltered, setKostcoUnfiltered] = useState([{}])
  const [kostcoArray, setKostcoArray] = useState([defaultKostcoCardState])
  // Need .length counter on Kostco card array after setting up Kostco card listener

  // Kostco card listener
  useEffect(() => {
    onValue(ref(db, 'kostco'),
      (snapshot) => {
        const tempKostcoArray = []
        if (snapshot.exists()) {
          snapshot.forEach((kostcoCard) => {
            tempKostcoArray.push(kostcoCard.val())
          })
        }
        setKostcoUnfiltered(tempKostcoArray)
        // setKostcoArray(tempKostcoArray)
      }
    )

  }, [])

  // // Search Effect
  // useEffect(() => {
  //   // Split out each search term seperated by a comma
  //   // into an additional search
  //   const searchTermsArray = kostcoSearch
  //     .terms
  //     .toLowerCase()
  //     .split(/[\s,]+/)
  //     .filter(term => term.length > 0)

  //   // Find all the textbox search parameters that are selected 'true'
  //   // This defaults to searching the Title, Ongoing, and Oneshot (not flavor) boxes
  //   const textboxesArray = Object
  //     .entries(kostcoSearch)
  //     .filter(searchTerm => (
  //       // if the value of term is 'true'
  //       searchTerm[1]
  //       &&
  //       // if key of term starts with 'k'
  //       (/^k/).test(searchTerm[0])
  //     ))
  //     // Get  the key text for the keys with a 'true' value
  //     .map(keyValue => keyValue[0])

  //   // Search previously selected text boxes with the entered text search terms
  //   const textboxFilteredArray = kostcoUnfiltered
  //     // for each kard in the list
  //     .filter((kardObject) => {

  //       const kEntries = Object
  //         // create array entries for the keyValue pairs
  //         .entries(kardObject)
  //         // and filter out the keyValue pairs that do not contain
  //         // text from the search parameters
  //         .filter(keyValue => {
  //           // convert all kard text to lowercase
  //           // if the keyValue pair contains a text value
  //           const lowercaseText = (
  //             (
  //               (/^k/).test(keyValue[0])
  //               &&
  //               keyValue[1].length > 0
  //             )
  //               ?
  //               keyValue[1].toLowerCase()
  //               :
  //               ''
  //           )

  //           return (
  //             // If the set of text boxes to search includes
  //             // the key of this keyValue pair
  //             textboxesArray.includes(keyValue[0])
  //             &&
  //             (
  //               // if there are NO search terms in the search box
  //               (searchTermsArray.length === 0)
  //               ||
  //               // if the text of the keyValue pair includes any of the search
  //               // terms entered in the search box
  //               (
  //                 searchTermsArray
  //                   .filter(searchTerm => lowercaseText.includes(searchTerm))
  //                   .length > 0
  //               )
  //             )

  //           )
  //         }
  //         ).length
  //       // if any of the search terms in the search box are present in any of the selected
  //       // text box elements of the kard, that element will be returned and counted in kEntries
  //       // If that element exists, this kard should be passed to the next filter function
  //       return kEntries > 0
  //     })

  //   // const textFilteredArray = textboxFilteredArray
  //   //   .filter((kardObject) => {
  //   //     const textFilter = Object
  //   //       .entries(kardObject)
  //   //       .filter(keyValue => {

  //   //         const lowercaseText = (
  //   //           (
  //   //             (/^k/).test(keyValue[0])
  //   //             &&
  //   //             keyValue[1].length > 0
  //   //           )
  //   //             ?
  //   //             keyValue[1].toLowerCase()
  //   //             :
  //   //             ''
  //   //         )
  //   //         // console.log('lowercaseText', lowercaseText)

  //   //         return (
  //   //           (searchTermsArray.length === 0)
  //   //           ||
  //   //           (
  //   //             searchTermsArray
  //   //               .filter(searchTerm => lowercaseText.includes(searchTerm))
  //   //               .length > 0
  //   //           )
  //   //         )
  //   //       })
  //   //     // .length
  //   //     console.log('textFilter', textFilter)
  //   //     return textFilter.length > 0
  //   //   })

  //   console.log('kostcoSearchG', kostcoSearch.g)

  //   // Create a text array of 'ongoing' key names with a value of true
  //   const paramArrayG = Object
  //     // create a temporary array from the 'g' object on the search reducer
  //     .entries(kostcoSearch.g)
  //     // select all 'g' object search parameters that are 'true'
  //     .filter(keyValue => keyValue[1])
  //     // return only the key text from the keyValue pair
  //     .map(keyValue => keyValue[0])


  //   // Create a text array of 'oneshot' key names with a value of true
  //   const paramArrayT = Object
  //     // create a temporary array from the 'g' object on the search reducer
  //     .entries(kostcoSearch.t)
  //     // select all 'g' object search parameters that are 'true'
  //     .filter(keyValue => keyValue[1])
  //     // return only the key text from the keyValue pair
  //     .map(keyValue => keyValue[0])



  //   // If restrictions exist, evaluate whether an individual kard
  //   // has a flag that indicates it meets that restriction
  //   // otherwise return all kards
  //   const flagFilteredArray = textboxFilteredArray
  //     .filter((kardObject) => {

  //       const objectFilterG = Object
  //         .entries(kardObject.g)
  //         .filter(keyValue =>
  //         (
  //           keyValue[1]
  //           &&
  //           (
  //             paramArrayG.length > 0
  //               ?
  //               paramArrayG.includes(keyValue[0])
  //               :
  //               true
  //           )))
  //         .length

  //       const objectFilterT = Object
  //         .entries(kardObject.t)
  //         .filter(keyValue =>
  //         (
  //           keyValue[1]
  //           &&
  //           (
  //             paramArrayT.length > 0
  //               ?
  //               paramArrayT.includes(keyValue[0])
  //               :
  //               true
  //           )))
  //         .length
  //       console.log('G plus T', (objectFilterG + objectFilterT))

  //       return (objectFilterG + objectFilterT) > 0
  //     })



  //   // setKostcoArray(flagFilteredArray)



  // }, [kostcoSearch, kostcoUnfiltered])

  // Auth Control
  useEffect(() => {
    if (auth.currentUser.uid !== adminAccess) {
      navigate('/')
    }
  })



  return (
    <div>
      <KostcoUpdatesRouter
        kostcoArray={kostcoArray}
        kostcoSearch={kostcoSearch}
        dispatchKostcoSearch={dispatchKostcoSearch}
        kostcoUnfiltered={kostcoUnfiltered}
        setKostcoArray={setKostcoArray}
      />
    </div>

  )
}

export default KostcoUpdates