import React, {useState} from 'react'
import {Input} from 'reactstrap';

function MultipleFileInput(props) {
    return (
        <div>
            <div className="custom-file">
                <Input 
                    //onChange={(e) => handleImageUpload(e)} 
                    type="file" 
                    className="custom-file-input" 
                    id="customFile1" 
                    multiple
                />
                <label className="custom-file-label" htmlFor="customFile1">
                    Seleccionar archivos
                </label>
            </div>
        </div>
    )
}

export default MultipleFileInput
