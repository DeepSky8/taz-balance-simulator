import React from "react";
import {
  kSearchFlavor,
  kSearchOneshot,
  kSearchOngoing,
  kSearchTerms,
  kSearchTitle
} from "../../../../actions/kostcoActions";


const KostcoSearchText = ({ kostcoSearch, dispatchKostcoSearch }) => {

  return (
    <div>

      <label htmlFor="searchTerms">Text Search: </label>

      <input
        type='checkbox'
        id='searchTitle'
        checked={kostcoSearch.kTitle}
        onChange={() => {
          dispatchKostcoSearch(kSearchTitle())
        }} />
      <label htmlFor="searchTitle">Search Title</label>

      <input
        type='checkbox'
        id='searchOngoing'
        checked={kostcoSearch.kOngoing}
        onChange={() => {
          dispatchKostcoSearch(kSearchOngoing())
        }}
      />
      <label htmlFor="searchOngoing">Search Ongoing text</label>

      <input
        type='checkbox'
        id='searchOneshot'
        checked={kostcoSearch.kOneshot}
        onChange={() => {
          dispatchKostcoSearch(kSearchOneshot())
        }}
      />
      <label htmlFor="searchOneshot">Search Oneshot text</label>

      <input
        type='checkbox'
        id='searchFlavor'
        checked={kostcoSearch.kFlavor}
        onChange={() => {
          dispatchKostcoSearch(kSearchFlavor())
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
            dispatchKostcoSearch(kSearchTerms(e.target.value))

          }}
        />
      </div>
    </div>
  )
}

export default KostcoSearchText