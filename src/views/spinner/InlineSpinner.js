import React from 'react'
import './Spinner.scss';
const InlineSpinner = () => {
    return (
        <div className="w-100">
            <div className="loading component-loader">
                <div className="effect-1 effects"></div>
                <div className="effect-2 effects"></div>
                <div className="effect-3 effects"></div>
            </div>
      </div>
    )
}
export default InlineSpinner;