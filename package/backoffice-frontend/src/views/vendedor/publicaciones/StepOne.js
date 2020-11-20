import React, {useState, useEffect} from 'react'
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

function StepOne() {

    const [tags, setTags]                           = useState([]);

    return (
        <div className="step step1 mt-5 ">
            <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                    <div className="">
                        <h4 className="font-weight-bold">Información comercial</h4>
                        <form id="Form" className="form-horizontal mt-2">
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Titulo del producto
                                </label>
                                <div>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Ingrese el Titulo de la publicación"
                                    />
                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Descripción corta
                                </label>
                                <div>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Descripción corta"
                                    />
                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Descripción
                                </label>
                                <div>
                                    <textarea 
                                    name="" 
                                    id="" 
                                    cols="30" 
                                    rows="4" 
                                    className="form-control"
                                    placeholder="Descripción"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Categoría
                                </label>
                                <div>

                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Subcategoría
                                </label>
                                <div>
                                    
                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Subcategoría
                                </label>
                                <TagsInput
                                    className="my-tags-input react-tagsinput"
                                    value={tags}
                                    onChange={(tags) => setTags(tags)}
                                    tagProps={{
                                        className: "react-tagsinput-tag bg-info text-white rounded",
                                    }}
                                    inputProps={{
                                        className: 'react-tagsinput-input',
                                        placeholder: 'Añadir etiqueta'
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOne
