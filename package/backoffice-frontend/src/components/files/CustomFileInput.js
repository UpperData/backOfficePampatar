import React, {useState} from 'react'
import {Input} from 'reactstrap';

function CustomFileInput(props) {

    let files = props.value;
    let returnFileType = props.returnFileType ? props.returnFileType : 'binary';

    function getBuffer(fileData) {
        return function(resolve) {
            var reader = new FileReader();

            if(returnFileType === 'binary'){
                console.log('binary');
                reader.readAsArrayBuffer(fileData);

                reader.onload = function() {
                    var result = this.result;
                    var array = new Uint8Array(result);
                    var binaryString = String.fromCharCode.apply(null, array);
                    resolve(array);
                }
            }

            if(returnFileType === 'base64'){
                console.log('base64');
                //console.log(fileData);

                reader.readAsDataURL(fileData);
                reader.onloadend = () => {
                    var result = reader.result;
                    var base64 = result.split(',')[1];
                    
                    console.log(base64);
                    resolve(base64);
                };
            }
        }
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        let filesSelected = e.target.files;

        if(filesSelected.length > 0){
            // Eventhandler for file input. 
            function convertTo() {
                console.log('convirtiendo files:', filesSelected);
                let fileData = new Blob([filesSelected[0]]);
                var promise = new Promise(getBuffer(fileData));
                // Wait for promise to be resolved, or log error.
                promise.then(function(data) {
                    console.log(data);
                    props.setBinary(data);
                    props.onChange(filesSelected);
                }).catch(function(err) {
                    console.log('Error: ',err);
                });
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
