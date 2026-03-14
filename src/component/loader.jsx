import React from 'react'
import { ClipLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#a00050",
  };

const loader = ({loading}) => {
  return (
    <>
    <ClipLoader
        loading={loading}
        cssOverride={override}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      
    </>
  )
}

export default loader
