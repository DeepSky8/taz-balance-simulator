import React from "react";
import { Link } from "react-router-dom";
import {
  kostcoSearchFlavor,
  kostcoSearchOneshot,
  kostcoSearchOngoing,
  kostcoSearchReset,
  kostcoSearchTerms,
  kostcoSearchTitle,
  kostcoToggleAll
} from "../../../../actions/kostcoActions";
import KostcoFlags from "./KostcoFlags";


const KostcoSearchModule = ({
  kostcoArray,
  kostcoSearch,
  dispatchKostcoSearch,
}) => {


  const updateKard = () => { }

  return (
    <div>
      <Link to='new'>New Kostco card</Link>
      <div>
        <button onClick={() => {
          dispatchKostcoSearch(kostcoSearchReset())
        }}>Clear Search</button>


        Kostco Cards displayed: {kostcoArray.length}

      </div>

      <label htmlFor="searchTerms">Text Search: </label>

      <input
        type='checkbox'
        id='searchTitle'
        checked={kostcoSearch.kTitle}
        onChange={() => {
          dispatchKostcoSearch(kostcoSearchTitle())
        }} />
      <label htmlFor="searchTitle">Search Title</label>

      <input
        type='checkbox'
        id='searchOngoing'
        checked={kostcoSearch.kOngoing}
        onChange={() => {
          dispatchKostcoSearch(kostcoSearchOngoing())
        }}
      />
      <label htmlFor="searchOngoing">Search Ongoing text</label>

      <input
        type='checkbox'
        id='searchOneshot'
        checked={kostcoSearch.kOneshot}
        onChange={() => {
          dispatchKostcoSearch(kostcoSearchOneshot())
        }}
      />
      <label htmlFor="searchOneshot">Search Oneshot text</label>

      <input
        type='checkbox'
        id='searchFlavor'
        checked={kostcoSearch.kFlavor}
        onChange={() => {
          dispatchKostcoSearch(kostcoSearchFlavor())
        }}
      />
      <label htmlFor="searchFlavor">Search Flavor</label>

      <div>
        <input
          type='text'
          id="searchTerms"
          name="searchTerms"
          placeholder="Search card text"
          value={kostcoSearch.terms}
          onChange={(e) => {
            dispatchKostcoSearch(kostcoSearchTerms(e.target.value))

          }}
        />
      </div>

      <div>
        <button onClick={() => { dispatchKostcoSearch(kostcoToggleAll()) }} >Toggle All</button>
        <label htmlFor="searchEffects">Must include: </label>
        <div id="searchEffects">

          <KostcoFlags
            reducer={kostcoSearch}
            dispatchReducer={dispatchKostcoSearch}
            updateKard={updateKard}
            ident={'search'}
          />

        </div>
      </div>


    </div>
  )
}

export default KostcoSearchModule