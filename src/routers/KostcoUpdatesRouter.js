import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/Authentication/NotFoundPage";
import DisplayKostcos from "../components/elements/admin/Kostco/DisplayKostcos";
import KostcoSearchModule from "../components/elements/admin/Kostco/KostcoSearchModule";
import NewKostco from "../components/elements/admin/Kostco/NewKostco";

const KostcoUpdatesRouter = ({ kostcoSearch, dispatchKostcoSearch, kostcoArray }) => {

  return (
    <div>
      <h1>Kostco Updates</h1>

      <Routes>
        <Route
          index
          element={
            <div>
              <KostcoSearchModule
                kostcoArray={kostcoArray}
                kostcoSearch={kostcoSearch}
                dispatchKostcoSearch={dispatchKostcoSearch}
              />
              <DisplayKostcos
                kostcoArray={kostcoArray}
                kostcoSearch={kostcoSearch}
              />
            </div>
          }
        />
        <Route
          path="new"
          element={<NewKostco />}
          errorElement={<NotFoundPage />}
        />

      </Routes>
    </div>
  )
}

export default KostcoUpdatesRouter