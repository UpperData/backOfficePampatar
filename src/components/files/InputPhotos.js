import React, {useState, useEffect} from 'react'
import {Input} from 'reactstrap';

function InputPhotos(props) {

    const [files,        setfiles]          = useState(props.value !== null ? props.value : []);
    const [count,        setcount]          = useState(0);
    const [errorMessage, seterrorMessage]   = useState("");

    function getBuffer(fileData) {
        return function(resolve) {
            var reader = new FileReader();
            //console.log('base64');

            //console.log(fileData);
            reader.readAsDataURL(fileData);
            reader.onloadend = () => {
                var result = reader.result;
                var base64 = result.split(',')[1];
                //var base64 = result.split(',')[1];
                //console.log(result);
                resolve(result);
            };
        }
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        let filesSelected = e.target.files;

        if(filesSelected.length > 0){
            seterrorMessage('');
            let filetype = filesSelected[0].name.split('.').pop();

            //Si el archivo se encuentra dentro de los formatos aceptados
            if((props.accept && props.accept.includes(filetype)) || props.accept === undefined){
                
                //console.log('Formato aceptado');
                //console.log('Tamaño del archivo:'+filesSelected[0].size);

                if((props.size && filesSelected[0].size <= Number(props.size) * 1024) || props.size === undefined){
                    
                    function convertFile() {
                        //console.log('convirtiendo archivo a base64:', filesSelected);

                        let fileData = new Blob([filesSelected[0]]);
                        var promise = new Promise(getBuffer(fileData));

                        promise.then(function(data) {
                            let actualFiles = files;
                            let newDataFile = {
                                id: files.length + 1,
                                name: filesSelected[0].name,
                                type: filetype,
                                url: data
                            }

                            actualFiles.push(newDataFile);

                            props.onChange(actualFiles);
                            setfiles(actualFiles);
                            setcount(count + 5);

                            //console.log(actualFiles);

                        }).catch(function(err) {
                            console.log('Error: ',err);
                        });
                    }
                    
                    convertFile();

                }else{
                    seterrorMessage('El tamaño de archivo es demasiado grande');
                    props.onChange(null);
                }
            }else{
                seterrorMessage('El formato del archivo es invalido');
                props.onChange(null);
            }
        }else{
            props.onChange(null);
        }
    }

    const deleteFile = (id) => {
        let actualList = files;
        let listWithoutItem = actualList.filter(item => item.id !== id);
        setfiles(listWithoutItem);
        setcount(count + 5);
    }

    return (
        <div>
            {(props.max === undefined || !(files.length === props.max)) &&
                <div className="custom-file">
                    <Input 
                        onChange={(e) => handleImageUpload(e)} 
                        type="file" 
                        className="custom-file-input" 
                        id="customFile1" 
                        multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile1">
                        Seleccionar archivos
                    </label>
                </div>
            }

            {files.length > 0
            ?
                <div>
                    {(props.max === undefined || !(files.length === props.max)) &&
                        <div className="alert alert-info mt-3">
                            <p className="mb-0">
                                Archivos seleccionados: {files.length}
                            </p>
                        </div>
                    }
                    <div>
                        <ul className="list-unstyled">
                            {files.map((item, key) => {
                                return (
                                    <li key={key} className="shadow-sm d-block my-2">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <img src={item.url} className="img-fluid shadow-sm" alt="Preview" />
                                            </div>
                                            <div className="col-md-12">
                                                <button type="button" 
                                                onClick={() => deleteFile(item.id)} 
                                                className="btn btn-block w-100 btn-sm py-2 btn-danger m-0">
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            :
                <div className="alert alert-warning mt-3">
                    <p className="mb-0">
                        Sin archivos seleccionados.
                    </p>
                </div>
            }
        </div>
    )
}

export default InputPhotos
