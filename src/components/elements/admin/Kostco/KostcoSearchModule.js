import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  kSearchOneshotFlags,
  kSearchOngoingFlags,
  kSearchReset,
  kToggleAll
} from "../../../../actions/kostcoActions";
import KostcoSearchFlags from "./KostcoSearchFlags";
import KostcoSearchText from "./KostcoSearchText";


const KostcoSearchModule = ({
  kostcoArray,
  kostcoSearch,
  dispatchKostcoSearch,
  kostcoUnfiltered,
  setKostcoArray,
}) => {
  const ident = 'search'
  // Search Effect
  useEffect(() => {
    // Split out each search term seperated by a comma
    // into an additional search
    const searchTermsArray = kostcoSearch
      .terms
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(term => term.length > 0)

    // Find all the textbox search parameters that are selected 'true'
    // This defaults to searching the Title, Ongoing, and Oneshot (not flavor) boxes
    const textboxesArray = Object
      .entries(kostcoSearch)
      .filter(searchTerm => (
        // if the value of term is 'true'
        searchTerm[1]
        &&
        // if key of term starts with 'k'
        (/^k/).test(searchTerm[0])
      ))
      // Get  the key text for the keys with a 'true' value
      .map(keyValue => keyValue[0])

    // Search previously selected text boxes with the entered text search terms
    const textboxFilteredArray = kostcoUnfiltered
      // for each kard in the list
      .filter((kardObject) => {

        const kEntries = Object
          // create array entries for the keyValue pairs
          .entries(kardObject)
          // and filter out the keyValue pairs that do not contain
          // text from the search parameters
          .filter(keyValue => {
            // convert all kard text to lowercase
            // if the keyValue pair contains a text value
            const lowercaseText = (
              (
                (/^k/).test(keyValue[0])
                &&
                keyValue[1].length > 0
              )
                ?
                keyValue[1].toLowerCase()
                :
                ''
            )

            return (
              // If the set of text boxes to search includes
              // the key of this keyValue pair
              textboxesArray.includes(keyValue[0])
              &&
              (
                // if there are NO search terms in the search box
                (searchTermsArray.length === 0)
                ||
                // if the text of the keyValue pair includes any of the search
                // terms entered in the search box
                (
                  searchTermsArray
                    .filter(searchTerm => lowercaseText.includes(searchTerm))
                    .length > 0
                )
              )

            )
          }
          ).length
        // if any of the search terms in the search box are present in any of the selected
        // text box elements of the kard, that element will be returned and counted in kEntries
        // If that element exists, this kard should be passed to the next filter function
        return kEntries > 0
      })

    // console.log('textboxfilteredArray', textboxFilteredArray)



    // Create a text array of 'ongoing' effect key names with a value of true
    const paramArrayG = Object
      // create a temporary array from the 'g' object on the search reducer
      .entries(kostcoSearch.g)
      // select all 'g' object search parameters that are 'true'
      .filter(keyValue => keyValue[1])
      // return only the key text from the keyValue pair
      .map(keyValue => keyValue[0])


    // Create a text array of 'oneshot' effect key names with a value of true
    const paramArrayT = Object
      // create a temporary array from the 't' object on the search reducer
      .entries(kostcoSearch.t)
      // select all 't' object search parameters that are 'true'
      .filter(keyValue => keyValue[1])
      // return only the key text from the keyValue pair
      .map(keyValue => keyValue[0])



    // If restrictions exist, evaluate whether an individual kard
    // has a flag that indicates it meets that restriction
    // otherwise return all kards
    const flagFilteredArray = textboxFilteredArray
      .filter((kardObject) => {

        const objectFilterG = Object
          .entries(kardObject.g)
          .filter(keyValue =>
          (
            (keyValue[1] === true)
            &&
            (kostcoSearch.fOngoing)
            &&
            (
              paramArrayG.length > 0
                ?
                paramArrayG.includes(keyValue[0])
                :
                true
            )))
          .length
        // console.log('objectFilterG', objectFilterG)

        const objectFilterT = Object
          .entries(kardObject.t)
          .filter(keyValue =>
          (
            (keyValue[1] === true)
            &&
            (kostcoSearch.fOneshot)
            &&
            (
              paramArrayT.length > 0
                ?
                paramArrayT.includes(keyValue[0])
                :
                true
            )))
          .length
        // console.log('G plus T', (objectFilterG + objectFilterT))
        // console.log('objectFilterT', objectFilterT)

        return (objectFilterG + objectFilterT) > 0
      })
    // console.log('flagFilteredArray', flagFilteredArray)

    if (kostcoSearch.fOngoing === false && kostcoSearch.fOneshot === false) {
      setKostcoArray(textboxFilteredArray)
    } else {
      setKostcoArray(flagFilteredArray)
    }

  }, [kostcoSearch, kostcoUnfiltered])

  const updateKard = () => { }

  return (
    <div>
      <Link to='new'>New Kostco card</Link>
      <div>
        <button onClick={() => {
          dispatchKostcoSearch(kSearchReset())
        }}>Clear Search</button>


        Kostco Cards displayed: {kostcoArray.length}

      </div>

      <KostcoSearchText
        kostcoSearch={kostcoSearch}
        dispatchKostcoSearch={dispatchKostcoSearch}
      />

      <div>

        <label htmlFor="searchEffects">Must include: </label>
        <span>

          <input
            type='checkbox'
            id={'fOngoing' + ident}
            checked={kostcoSearch.fOngoing}
            onChange={() => {
              dispatchKostcoSearch(kSearchOngoingFlags())
            }}

          />
          <label htmlFor={'fOngoing' + ident}>Ongoing</label>

          <input
            type='checkbox'
            id={'fOneshot' + ident}
            checked={kostcoSearch.fOneshot}
            onChange={() => {
              dispatchKostcoSearch(kSearchOneshotFlags())
            }}

          />
          <label htmlFor={'fOneshot' + ident}>Oneshot</label>

        </span>

        <KostcoSearchFlags
          id="searchEffects"
          reducer={kostcoSearch}
          dispatchReducer={dispatchKostcoSearch}
          updateKard={updateKard}
          ident={ident}
        />

      </div>


    </div>
  )
}

export default KostcoSearchModule

//         <button onClick={() => { dispatchKostcoSearch(kToggleAll()) }} >Toggle All</button>