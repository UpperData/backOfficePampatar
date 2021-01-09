import React, {useState} from 'react'
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {
	Card,
	CardBody,
    CardTitle,
    CustomInput
} from 'reactstrap';

import PrincipalCategoriesSelect from '../../../components/selects/PrincipalCategoriesSelect';
import MultipleFileInput from '../../../components/files/MultipleFileInput';

function BidsSellerAd() {

    const [tags, setTags]   = useState([]);
    /*
    {
                “skuId”:x
                "bidTypeId":1 -->producto o servicio	

                    _________________________________________________"attachment":{
                        “photo”:
                        [
                            {"data"”:010101”},
                            {"data":”01010101”},
                            {"data":”01010101”},
                            {"data":”01010101”},
                        ],
                        ”video”:”http://Url”
                        }
                    , 
                    _________________________________________________"title":"Zapatos de Cuero 1",  
                "brandId":1,
                    _________________________________________________"longDesc":"Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,",
                    _________________________________________________"smallDesc":"Bla, bla,Bla, bla,Bla, bla,",
                    _________________________________________________"tags":[{"name":"zapatos"},{"name":"cuero"},{"name":"hombres"}], 
                    _________________________________________________"category":[{"category":[{"id":4,"name":"Ropa"}],"subCategory":[{"id":1,"name":"Hombre"},{"id":2,"name":"Cuero"}]}], 	
                "StatusId":1, 
                "statusId":[{"id":2,"name":"En Evaluación"}], 
                "garanty":9,

                    _________________________________________________"customizable":true,
                    _________________________________________________"customize":"Con mi nombre",

                "include":"Par de Zapatos con trenzas", 
                "devolution":true,
                "time":1, 
                "disponibility":1,
                    _________________________________________________"weight":0.8, 
                    _________________________________________________"dimesion":{"height":17,"width":32,"depth":2}
                    _________________________________________________“materials”:[{“id”:1,”name”:”Madera”,”quantity”:12,”note”:”xeeee”}]
                }

    */
            
    return (
        <div>
            <h1 className="h4 d-none mb-3 font-weight-bold">
                Crear publicación
            </h1>
            <Card>
				<CardBody className="border-bottom">
					<CardTitle className="mb-0">
                        <i className="mdi mdi-border-right mr-2"></i>Datos de la publicación
                    </CardTitle>
				</CardBody>
				<CardBody>
					<div>

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
                                                    <PrincipalCategoriesSelect />
                                                </div>
                                            </div>
                                            <div className="form-group d-none content form-block-holder">
                                                <label className="control-label">
                                                    Subcategoría
                                                </label>
                                                <div>
                                                    
                                                </div>
                                            </div>
                                            <div className="form-group content form-block-holder">
                                                <label className="control-label">
                                                    Tags
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


                        <div className="step step1 mt-5 ">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-6">
                                    <div className="">
                                        <h4 className="font-weight-bold">Detalles</h4>
                                        <form id="Form" className="form-horizontal mt-2">
                                            <div className="form-group content form-block-holder">
                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="control-label">
                                                                Materiales de fabricación
                                                            </label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="control-label">
                                                                Cantidad
                                                            </label>
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
                                                                <label className="control-label">
                                                                    Ingrese una nota
                                                                </label>
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



                        <div>
                            <div className="step step1 mt-5 ">
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-6">
                                        <div className="">
                                            <h4 className="font-weight-bold">Personalización</h4>
                                        </div>
                                        <div className="form-group">
                                            <CustomInput 
                                                className="d-inline-flex mr-3" 
                                                type="checkbox" 
                                                id={`customizable`} 
                                                name={`customizable`}    
                                                label='Producto personalizable' 
                                            />
                                        </div>    
                                        <div className="form-group">
                                            <label htmlFor="customize">Tipo de Personalización</label>
                                            <input 
                                                id="customize"
                                                type="text" 
                                                name="customize"
                                                className="form-control" 
                                                placeholder="Describa la personalización"
                                            />
                                        </div>          
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <div className="step step1 mt-5 ">
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-6">
                                        <div className="">
                                            <h4 className="font-weight-bold mb-0">Media</h4>
                                            <small className="text-muted mb-2">Adjuntar archivos</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="customize">Insertar fotos</label>
                                            <MultipleFileInput />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="customize">Añadir video</label>
                                            <input 
                                                id="video"
                                                type="text" 
                                                name="video"
                                                className="form-control" 
                                                placeholder="Url del video"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default BidsSellerAd
