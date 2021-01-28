import React, {useState} from 'react'
import {Input} from 'reactstrap';

function CustomFileInput(props) {

    let files = props.value;
    let showPreview = props.showPreview ? props.showPreview  : false;
    let returnFileType = props.returnFileType ? props.returnFileType : 'binary';

    function binEncode(data) {
        var binArray = []
        var datEncode = "";
    
        for (var i=0; i < data.length; i++) {
            binArray.push(data[i].charCodeAt(0).toString(2)); 
        } 
        for (var j=0; j < binArray.length; j++) {
            var pad = padding_left(binArray[j], '0', 8);
            datEncode += pad + ' '; 
        }
        function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
            return s;
        }
        var max = (n - s.length)/c.length;
        for (var i = 0; i < max; i++) {
            s = c + s; } return s;
        }

        console.log(datEncode);
        //return(binArray);
        return datEncode;
    }

    const [preview, setpreview] = useState(null);
    const [errorMessage, seterrorMessage] = useState('');

    function getBuffer(fileData) {
        return function(resolve) {
            var reader = new FileReader();

            if(showPreview){
                /*
                    var auxreader = new FileReader();
                    auxreader.readAsDataURL(fileData);

                    auxreader.onloadend = () => {
                        var result = auxreader.result;
                        //props.handlePreview(result);
                    };
                */
                console.log('mostrando preview');
            }

            if(returnFileType === 'binary'){
                console.log('binary');
                reader.readAsArrayBuffer(fileData);

                reader.onload = function() {
                    var result = this.result;
                    var array = new Uint8Array(result);
                    //var binaryString = String.fromCharCode.apply(null, array);
                    resolve(array);
                }
            }

            if(returnFileType === 'base64'){
                console.log('base64');
                console.log(fileData);

                reader.readAsDataURL(fileData);
                reader.onloadend = () => {
                    var result = reader.result;
                    var base64 = result.split(',')[1];
                    
                    console.log(result);
                    resolve(base64);
                };
            }

            if(returnFileType === 'base64complete'){
                console.log('base64');
                console.log(fileData);

                reader.readAsDataURL(fileData);
                reader.onloadend = () => {
                    var result = reader.result;
                    //var base64 = result.split(',')[1];
                    
                    console.log(result);
                    resolve(result);
                };
            }

            if(returnFileType === 'base64-binary'){
                console.log('base64 to binary');
                console.log(fileData);

                reader.readAsDataURL(fileData);
                reader.onloadend = () => {
                    var result = reader.result;
                    var base64 = result.split(',')[1];
                    let binary = binEncode(base64);

                    resolve(binary);
                };
            } 
        }
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        let filesSelected = e.target.files;

        if(filesSelected.length > 0){
            seterrorMessage('');
            // Eventhandler for file input. 
            let type = filesSelected[0].name.split('.').pop();

            if((props.accept && props.accept.includes(type)) || props.accept === undefined){

                console.log('formato aceptado');
                console.log(filesSelected[0].size);

                if((props.size && filesSelected[0].size <= Number(props.size) * 1024) || props.size === undefined){

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
                    seterrorMessage('El tamaño de archivo es demasiado grande');
                    setpreview(null);
                    props.setBinary(null);
                    props.onChange(null);
                }
            }else{
                seterrorMessage('El formato del archivo es invalido');
                setpreview(null);
                props.setBinary(null);
                props.onChange(null);
            }

        }else{

            setpreview(null);
            props.setBinary(null);
            props.onChange(null);

            /*
            if(props.handlePreview){
                props.handlePreview(null);
            }
            */
        }
    }

    return (
        <div>
            <div className="custom-file">
                <Input 
                    onChange={(e) => handleImageUpload(e)} 
                    type="file" 
                    className="custom-file-input" 
                    id="customFile1" 
                />
                <label className="custom-file-label" htmlFor="customFile1">
                    {(files !== null) ? files[0].name : 'Seleccionar archivo'}
                </label>
            </div>
            {errorMessage !== '' &&
                <div className="alert my-2 alert-danger">
                    {errorMessage}
                </div>
            }

            {(showPreview && preview !== null) &&
                <div className="my-2 d-none">
                    <h6 className="font-weight-bold">Preview</h6>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={preview} className="img-fluid" alt="preview" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CustomFileInput
