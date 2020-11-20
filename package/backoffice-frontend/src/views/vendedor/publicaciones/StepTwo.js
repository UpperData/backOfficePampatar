import React from 'react'

function StepTwo() {
    return (
        <div className="step step1 mt-5 ">
            <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                    <div className="">
                        <h4 className="font-weight-bold">Detalles</h4>
                        <form id="Form" className="form-horizontal mt-2">
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Materiales de fabricación
                                </label>
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input 
                                                    type="number" 
                                                    className="form-control"
                                                    placeholder="Cantidad"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <textarea 
                                                    name="" 
                                                    id="" 
                                                    cols="30" 
                                                    rows="4"
                                                    placeholder="Nota"
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Peso (kg)
                                </label>
                                <div>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Peso"
                                    />
                                </div>
                            </div>
                            <div className="form-group content form-block-holder">
                                <label className="control-label">
                                    Dimensiones
                                </label>
                                <div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input 
                                                    type="number" 
                                                    className="form-control"
                                                    placeholder="Anchura"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="Altura"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="Profundidad"
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepTwo
