import React, {useState} from 'react'
import {Input} from 'reactstrap';

function CustomFileInput(props) {

    let files = props.value;

    const handleImageUpload = (e) => {
        e.preventDefault();
        let filesSelected = e.target.files;

        if(filesSelected.length > 0){
            const convertTo = async () => {
                console.log('File:', filesSelected[0]);
                var fileToLoad = filesSelected[0];
                var fileReader = new FileReader();
                var result = null;
    
                fileReader.onload = await function(){ 
                    result = fileReader.result; 
                    
                    props.setBinary(result);
                    props.onChange(filesSelected);
                };
    
                fileReader.readAsBinaryString(fileToLoad);
            }
            
            convertTo();
        }else{
            props.setBinary(null);
            props.onChange(null);
        }
    }

    return (
        <div className="custom-file">
            <Input onChange={(e) => handleImageUpload(e)} type="file" className="custom-file-input" id="customFile1" />
            <label className="custom-file-label" htmlFor="customFile1">
                {(files !== null) ? files[0].name : 'Seleccionar archivo'}
            </label>
        </div>
    )
}

export default CustomFileInput
