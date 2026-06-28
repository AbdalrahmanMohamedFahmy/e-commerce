import React from 'react'
import { HashLoader } from "react-spinners";


export default function Loading() {
  return <>
  <div className="sweet-loading flex items-center justify-center">
      <HashLoader
        color={'#0aad0a'}
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    
    </div>
  </>
}
