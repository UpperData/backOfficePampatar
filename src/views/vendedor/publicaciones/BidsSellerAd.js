import React, {useState, useEffect} from 'react'
import axios from "axios"
import TagsInput from "react-tagsinput";
import {useSelector} from "react-redux"
import "react-tagsinput/react-tagsinput.css";
import {
	Card,
	CardBody,
    CardTitle,
    CustomInput,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';

import PrincipalCategoriesSelect from '../../../components/selects/PrincipalCategoriesSelect';
import MultipleFileInput from '../../../components/files/MultipleFileInput';
import SkuTypeSelect from '../../../components/selects/SkuTypeSelect';
import ServicesSelect from '../../../components/selects/servicesSelect';
import MaterialOffSelect from '../../../components/selects/MaterialOffSelect';
import CategoriesSelect from '../../../components/selects/CategoriesSelect';
import ProductSelect from '../../../components/selects/ProductSelect';

import TypeBidSelect from '../../../components/selects/TypeBidSelect';
import DisponibilitySelect from '../../../components/selects/DisponibilitySelect';
import Materials from '../../../components/helpers/Materials';
import InputPhotos from '../../../components/files/InputPhotos';
import SkuForBidSelect from '../../../components/selects/SkuForBidSelect';
import BrandSelect from '../../../components/selects/brandSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import CategoriesLvlTwo from '../../../components/selects/categorieslist/CategoriesLvlTwo';
import CategoriesLvlThree from '../../../components/selects/categorieslist/CategoriesLvlThree';
import CategoriesLvlFour from '../../../components/selects/categorieslist/CategoriesLvlFour';
import ReasonsSelect from '../../../components/selects/ReasonsSelect';

function BidsSellerAd() {

    //Crear publicacion
    const [loading,     setloading]                     = useState(true);
    const [search,      setsearch]                      = useState(true);
    const [published,   setpublished]                   = useState(false);
    const [menuCats,    setmenuCats]                    = useState(null);

    const [sending,     setsending]                     = useState(false);
    const [errors,      seterrors]                      = useState({});
    const [successmessage, setsuccessmessage]           = useState("");
    const [errormessage,    seterrormessage]            = useState("");

    const [disableInput, setdisableInput]               = useState(true);

    const [steps,        setsteps]                      = useState(null);
    const [activeStep,   setActiveStep]                 = useState(null);

    const [skuId,   setskuId]                           = useState(null);
    const [bidType, setbidType]                         = useState(null);
    const [title,   settitle]                           = useState('');
    const [brandId, setbrandId]                         = useState(null);

    const [longDesc,        setlongDesc]                = useState(''); //ENTRE 256-800 CARACTERES (SIN CONTAR ESPACIOS)
    const [smallDesc,       setsmallDesc]               = useState(''); // ENTRE 20-200 CARACTERES (SIN CONTAR ESPACIOS)
    const [disponibilityId, setdisponibilityId]         = useState(null);
    const [time,            settime]                    = useState(0);
    const [devolution,      setdevolution]              = useState(true);

    const [category,        setcategory]                = useState(null);
    const [categorylvl2,    setcategorylvl2]            = useState(null);
    const [categorylvl3,    setcategorylvl3]            = useState(null);
    const [categorylvl4,    setcategorylvl4]            = useState(null);

    const [include,         setinclude]                 = useState(''); //ENTRE 20-200 CARACTERES (SIN CONTAR ESPACIOS
    const [customize,       setcustomize]               = useState("");
    const [customizable,    setcustomizable]            = useState(false);
    const [garanty,         setgaranty]                 = useState(false);
    const [garantyDays,     setgarantyDays]             = useState(0);
    const [tags,            setTags]                    = useState([]);

    const [urlVideos,   seturlVideos]                   = useState('');
    const [materials,   setmaterials]                   = useState(null);
    const [weight,      setweight]                      = useState('');
    const [photos,      setphotos]                      = useState([]);

    const [photo1, setphoto1]                           = useState(null);
    const [photo2, setphoto2]                           = useState(null);
    const [photo3, setphoto3]                           = useState(null);
    const [photo4, setphoto4]                           = useState(null);

    const [reasons,     setreasons]                     = useState([]);
    const [dimension, setdimension]                     = useState({
        height: "", 
        width:  "", 
        depth:   ""
    });

    const [materialName, setmaterialName]               = useState("");
    const [materialquantity, setmaterialquantity]       = useState("");    

    const [showModalNewMaterial, setShowModalNewMaterial] = useState(false);
    const toggle = () => setShowModalNewMaterial(!showModalNewMaterial);

    let stepName = [
        {name: 'title',             stepname: 'Información comercial'},
        {name: 'media',             stepname: 'Media'},
        {name: 'details',           stepname: 'Detalles'},
        {name: 'customization',     stepname: 'Personalización'},
    ];

    const changeTypeBid = (value) => {
        if(value.value === 2){
            setsteps([
                'title',
                'details',
                'media'
            ]);
            setActiveStep('title');
            setbidType(value);
        }else{
            setsteps([
                'title',
                'details',
                'media'
            ]);
            setActiveStep('title');
            setbidType(value);
        }
    }

    const backStep = () => {
        let activeStepIndex = steps.indexOf(activeStep);
        let next = activeStepIndex -1;

        setActiveStep(steps[next]);
        console.log(activeStepIndex);

        window.scrollTo({top: 50, behavior: 'smooth'});
    }

    const nextStep = () => {
        let activeStepIndex = steps.indexOf(activeStep);
        let next = activeStepIndex + 1;

        let validate = validateStep();

        if(validate){
            if(steps.length - 1 >= next){
                seterrors({});
                setActiveStep(steps[next]);
                console.log(activeStepIndex);
            }else{
                console.log("No es posible realizar esta accion");
            }
            window.scrollTo({top: 50, behavior: 'smooth'});
        }
    }

    const validateStep = () => {
        let countErrors = 0;
        let actualStep = activeStep;
        let thiserrors = {};

        if(actualStep === "title"){
            if(title === ''){
                thiserrors.title = "Debe ingresar un título para la publicación";
                countErrors++;
            }else if(title.length < 20){
                thiserrors.title = "El titulo de su publicacion es demasiado corto";
                countErrors++;
            }
    
            if(smallDesc === ''){
                thiserrors.smallDesc = "Debe ingresar una descripcion corta";
                countErrors++;
            }else if(smallDesc.length < 20){
                thiserrors.smallDesc = "La descripción corta debe ser mas amplia";
                countErrors++;
            }else if(smallDesc.length > 200){
                thiserrors.smallDesc = "La descripción corta debe ser menos amplia";
                countErrors++;
            }
        
            if(longDesc === ''){
                thiserrors.longDesc = "Debe ingresar una descripcion";
                countErrors++;
            }if(longDesc.length < 256){
                thiserrors.longDesc = "La descripción es muy corta";
                countErrors++;
            }else if(longDesc.length > 800){
                thiserrors.longDesc = "La descripción es muy larga";
                countErrors++;
            }
    
            if(tags.length === 0){
                thiserrors.tags = "Ingrese al menos una etiqueta.";
                countErrors++;
            }
            
            if(disponibilityId === '' || disponibilityId === null){
                thiserrors.disponibilityId = "Seleccione el tipo de disponibilidad.";
                countErrors++;
            }
    
            if(bidType.value !== 3){
                if( categorylvl2 === null || (Array.isArray(categorylvl2) && categorylvl2.length === 0) ){
                    thiserrors.categorylvl2 = "Seleccione una sub-categoría.";
                    countErrors++;
                }
            }
        }

        if(actualStep === "details"){
            if(materials === null || (Array.isArray(materials) && materials.length === 0)){
                thiserrors.materials = "Debe ingresar un material como mínimo.";
                countErrors++;
            }
    
            if(brandId === null){
                thiserrors.brandId = "Seleccione una marca.";
                countErrors++;
            }

            if(weight === "" || Number(weight) === 0){
                thiserrors.weight = "Debe añadir el peso.";
                countErrors++;
            }        
        }

        if(actualStep === "media"){
            if(photo1 === null){
                thiserrors.photo1 = "Debe ingresar una foto principal.";
                countErrors++;
            }
    
            if(photo2 === null){
                thiserrors.photo2 = "Debe ingresar una foto con angulos.";
                countErrors++;
            }
    
            if(photo3 === null){
                thiserrors.photo3 = "Debe ingresar una foto a comparacion de escala";
                countErrors++;
            }
    
            if(photo4 === null){
                thiserrors.photo4 = "Debe ingresar una foto siendo usado.";
                countErrors++;
            }
        }

        if(countErrors > 0){
            window.scrollTo({top: 50, behavior: 'smooth'});
            seterrors(thiserrors);
            return false;
        }else{
            return true;
        }
    }

    const validate = () => {
        let countErrors = 0;
        let thiserrors = {};
        let errorInStep = '';

        //title
        if(title === ''){
            thiserrors.title = "Debe ingresar un título para la publicación";
            countErrors++;
            errorInStep = "title";
        }else if(title.length < 20){
            thiserrors.title = "El titulo de su publicacion es demasiado corto";
            countErrors++;
            errorInStep = "title";
        }

        if(smallDesc === ''){
            thiserrors.smallDesc = "Debe ingresar una descripcion corta";
            countErrors++;
            errorInStep = "title";
        }else if(smallDesc.length < 20){
            thiserrors.smallDesc = "La descripción corta debe ser mas amplia";
            countErrors++;
            errorInStep = "title";
        }else if(smallDesc.length > 200){
            thiserrors.smallDesc = "La descripción corta debe ser menos amplia";
            countErrors++;
            errorInStep = "title";
        }

        if(longDesc === ''){
            thiserrors.longDesc = "Debe ingresar una descripcion";
            countErrors++;
            errorInStep = "title";
        }if(longDesc.length < 256){
            thiserrors.longDesc = "La descripción es muy corta";
            countErrors++;
            errorInStep = "title";
        }else if(longDesc.length > 800){
            thiserrors.longDesc = "La descripción es muy larga";
            countErrors++;
            errorInStep = "title";
        }

        if(tags.length === 0){
            thiserrors.tags = "Ingrese al menos una etiqueta.";
            countErrors++;
            errorInStep = "title";
        }
        
        if(disponibilityId === '' || disponibilityId === null){
            thiserrors.disponibilityId = "Seleccione el tipo de disponibilidad.";
            countErrors++;
            errorInStep = "title";
        }

        if(bidType.value !== 3){
            if( categorylvl2 === null || (Array.isArray(categorylvl2) && categorylvl2.length === 0) ){
                thiserrors.categorylvl2 = "Seleccione una sub-categoría.";
                countErrors++;
                errorInStep = "title";
            }
        }

        //details

        /*
        if(bidType.value === 1){
            if(reasons === null || (Array.isArray(reasons) && reasons.length === 0)){
                thiserrors.reasons = "Seleccione una razon.";
                countErrors++;
                errorInStep = "details";
            }
        }*/

        if(materials === null || (Array.isArray(materials) && materials.length === 0)){
            thiserrors.materials = "Debe ingresar un material como mínimo.";
            countErrors++;
            errorInStep = "details";
        }

        if(brandId === null){
            thiserrors.brandId = "Seleccione una marca.";
            countErrors++;
            errorInStep = "details";
        }
        
        //media

        if(photo1 === null){
            thiserrors.photo1 = "Debe ingresar una foto principal.";
            countErrors++;
            errorInStep = "media";
        }

        if(photo2 === null){
            thiserrors.photo2 = "Debe ingresar una foto con angulos.";
            countErrors++;
            errorInStep = "media";
        }

        if(photo3 === null){
            thiserrors.photo3 = "Debe ingresar una foto a comparacion de escala";
            countErrors++;
            errorInStep = "media";
        }

        if(photo4 === null){
            thiserrors.photo4 = "Debe ingresar una foto siendo usado.";
            countErrors++;
            errorInStep = "media";
        }

        if(photo4 === null){
            thiserrors.photo4 = "Debe ingresar una foto siendo usado.";
            countErrors++;
            errorInStep = "media";
        }

        if(urlVideos !== ""){
            console.log("url:"+urlVideos);
            let regvideo = /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])/;
            if(!regvideo.test(urlVideos)){
                thiserrors.video = "La url ingresada debe corresponder a un video de youtube";
                countErrors++;
                errorInStep = "media";
            }
        }

        if(countErrors > 0){
            if(errorInStep !== ''){
                setActiveStep(errorInStep);
                seterrors(thiserrors);
            }

            return false;
        }else{
            return true;
        }
    }

    const publish = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setsuccessmessage("");
        seterrormessage("");

        let url = "/seller/puBLIctIons/bid/aDd";
        console.log("publish");

        if(bidType.value === 3){
            let isValid = validate();

            if(isValid){
                //creacion de servicio
                let formattedMaterials = [];
                if(materials !== null && materials.length > 0){
                    for (let i = 0; i < materials.length; i++) {
                        const material = materials[i];
                        let newMaterial = {};
                        newMaterial.id    =   material.type.value;
                        newMaterial.name  =   material.type.label;
                        newMaterial.qty   =   material.qty;

                        formattedMaterials.push(newMaterial);
                    }
                }

                let data = {
                    bidType: bidType.value,
                    skuId: skuId.value,
                    BrandId: brandId.value,

                    title,
                    smallDesc,
                    longDesc, 
                    category: {},
                    disponibilityId: disponibilityId.value,

                    garanty: Number(garantyDays),
                    devolution,
                    materials: formattedMaterials,

                    tags,
                    weight,
    
                    photos: [
                        photo1[0].type+","+photo1[0].url, 
                        photo2[0].type+","+photo2[0].url, 
                        photo3[0].type+","+photo3[0].url, 
                        photo4[0].type+","+photo4[0].url
                    ]
                }

                console.log(data);
                setsending(true);
                
                axios({
                    method: "post",
                    data,
                    url
                }).then((res) => {
                    console.log(res.data);
                    if(res.data.data.result){
                        setsending(false);
                        setpublished(true);
                        setsuccessmessage(res.data.data.message);
                    }else{
                        setsending(false);
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                });

                //success

            }
        }else if(bidType.value !== 3){
            let isValid = validate();

            if(isValid){
                //creacion de material
                let formattedMaterials = [];
                if(materials !== null && materials.length > 0){
                    for (let i = 0; i < materials.length; i++) {
                        const material = materials[i];
                        let newMaterial = {};
                        newMaterial.id    =   material.type.value;
                        newMaterial.name  =   material.type.label;
                        newMaterial.qty   =   material.qty;

                        formattedMaterials.push(newMaterial);
                    }
                }

                let formattedReasons = [];
                if(reasons !== null && reasons.length > 0){
                    for (let i = 0; i < reasons.length; i++) {
                        const reason = reasons[i];
                        let newItem = {};
                        newItem.id    =   reason.value;
                        newItem.name  =   reason.label;

                        formattedReasons.push(newItem);
                    }
                }

                const formatArraySelect = (arrayData) => {
                    let newData = [];
                    if(arrayData.length > 0){
                        for (let i = 0; i < arrayData.length; i++) {
                            const element = arrayData[i];
                            let newItemData     = {};
                            newItemData.id      = element.value;
                            newItemData.name    = element.label;

                            newData.push(newItemData);
                        }
                    }

                    return newData;
                }

                //materials
                if(bidType.value === 2){

                    let data = {
                        bidType: bidType.value,
                        skuId: skuId.value,
                        BrandId: brandId.value,

                        title,
                        smallDesc,
                        longDesc, 
                        disponibilityId: disponibilityId.value,
                        category: {
                            subCat1: categorylvl2 !== null ? formatArraySelect(categorylvl2) : [],
                            subCat2: categorylvl3 !== null ? formatArraySelect(categorylvl3) : [],
                            subCat3: categorylvl4 !== null ? formatArraySelect(categorylvl4) : [],
                            subCat4: []
                        },

                        garanty: Number(garantyDays),
                        devolution,
                        materials: formattedMaterials,
                        tags,
                        weight,
                        include,
                        dimension: [dimension],

                        photos: [
                            photo1[0].type+","+photo1[0].url, 
                            photo2[0].type+","+photo2[0].url, 
                            photo3[0].type+","+photo3[0].url, 
                            photo4[0].type+","+photo4[0].url
                        ]
                    }
                    setsending(true);
                    console.log(data);
                    
                    axios({
                        method: "post",
                        data,
                        url
                    }).then((res) => {
                        console.log(res.data);
                        if(res.data.data.result){
                            setsending(false);
                            setpublished(true);
                            setsuccessmessage(res.data.data.message);
                        }else{
                            setsending(false);
                        }
                    }).catch((err) => {
                        console.error(err);
                        setsending(false);
                    });

                }else if(bidType.value === 1){

                    //hecho a mano
                    let data = {
                        bidType: bidType.value,
                        skuId: skuId.value,
                        BrandId: brandId.value,

                        title,
                        smallDesc,
                        longDesc, 
                        disponibilityId: disponibilityId.value,
                        category: {
                            subCat1: categorylvl2 !== null ? formatArraySelect(categorylvl2) : [],
                            subCat2: categorylvl3 !== null ? formatArraySelect(categorylvl3) : [],
                            subCat3: categorylvl4 !== null ? formatArraySelect(categorylvl4) : [],
                            subCat4: []
                        },

                        garanty: Number(garantyDays),
                        materials: formattedMaterials,

                        tags,
                        devolution,
                        
                        time,
                        weight,
                        include,
                        
                        customizable,
                        customize,
                        reasons: formattedReasons,
                        dimension: [dimension],
                        
                        photos: [
                            photo1[0].type+","+photo1[0].url, 
                            photo2[0].type+","+photo2[0].url, 
                            photo3[0].type+","+photo3[0].url, 
                            photo4[0].type+","+photo4[0].url
                        ]
                    }
                    setsending(true);
                    console.log(data);
                    
                    axios({
                        method: "post",
                        data,
                        url
                    }).then((res) => {
                        console.log(res.data);
                        if(res.data.data.result){
                            setsending(false);
                            setpublished(true);
                            setsuccessmessage(res.data.data.message);
                        }else{
                            setsending(false);
                        }
                    }).catch((err) => {
                        console.error(err);
                        setsending(false);
                    });
                }
            }
        }
    }      
    
    useEffect(() => {
        if(loading){
            if(search){
                let url = '/menu';

                axios.get(url).then((res) => {
                    setmenuCats(res.data.data.menu);
                    setloading(false);
                });
            }
        }else{
            if(steps !== null){   
                if((steps.indexOf(activeStep) + 1) < (Number(steps.length))){
                    if(!disableInput){
                        setdisableInput(true);
                    }
                }else{
                    if(disableInput){
                        setTimeout(() => {
                            setdisableInput(false);
                        }, 400);
                    }
                }
            }
        }
    });

    //console.log(bidType);

    const changeCat2 = (values) => {
        setcategorylvl2(values);
        setcategorylvl3(null);
        setcategorylvl4(null);
    }

    const changeCat3 = (values) => {
        setcategorylvl3(values);
        setcategorylvl4(null);
    }

    const changeCat4 = (values) => {
        setcategorylvl4(values);
    }

    let idBydTypeInCategories = null;
    let searchBidInCategories = null;
    //console.log(menuCats);
    //console.log(bidType);

    if(bidType!==null && bidType.value === 3){
        searchBidInCategories = menuCats.find(item => item.name === "Talleres");
        idBydTypeInCategories = searchBidInCategories.id;
    }else if(bidType!==null && bidType.value === 2){
        searchBidInCategories = menuCats.find(item => item.name === "Materiales");
        idBydTypeInCategories = searchBidInCategories.id;
    }else if(bidType!==null && bidType.value === 1){
        searchBidInCategories = menuCats.find(item => item.name === "Hecho a Mano");
        idBydTypeInCategories = searchBidInCategories.id;
    }

    const reset = () => {
        setsteps(null);
        setActiveStep(null);
        setskuId(null);
        setbidType(null);
        settitle('');
        setbrandId(null);
        setlongDesc('');
        setsmallDesc('');
        setdisponibilityId(null);
        settime(0);
        setdevolution(true);
        setcategory(null);
        setcategorylvl2(null);
        setcategorylvl3(null);
        setcategorylvl4(null);
        setinclude('');
        setcustomize("");
        setcustomizable(false);
        setgaranty(false);
        setgarantyDays(0);
        setTags([]);
        seturlVideos('');
        setmaterials(null);
        setweight(0);
        setphotos([]);
        setphoto1(null);
        setphoto2(null);
        setphoto3(null);
        setphoto4(null);
        setreasons([]);
        setdimension({
            height: "", 
            width:  "", 
            depth:   ""
        });
        setpublished(false);
    }
    
    const backTo = () => {
        if(bidType !== null){
            if(skuId !== null){
                //setsteps(null);
                //setActiveStep(null);
                setskuId(null);
            }else{
                setbidType(null);
                reset();
            }
        }
    }

    const addMaterial = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let listMaterials = materials !== null ? materials : [];
        let newMaterial = {
            id: listMaterials.length + 1,
            type: {label: materialName, value: "non_id"},
            qty: materialquantity
        }

        listMaterials.push(newMaterial);
        setmaterials(listMaterials);
        setmaterialName("");
        setmaterialquantity("");
        setShowModalNewMaterial(false);
    }

    //console.log(materials);

    if(!loading){
        if(!published){
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">
                        Nueva publicación
                    </h1>

                    <Modal isOpen={showModalNewMaterial} toggle={toggle}>
                        <form onSubmit={(e) => addMaterial(e)} action="">
                            <ModalHeader toggle={toggle}>
                                <strong>
                                    Nuevo material
                                </strong>
                            </ModalHeader>
                            <ModalBody>
                                <div className="">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <div className="form-group">
                                                <label htmlFor="materialname">
                                                    Nombre del material
                                                </label>
                                                <input 
                                                    required
                                                    id="materialname"
                                                    value={materialName}
                                                    onChange={(e) => setmaterialName(e.target.value)}
                                                    type="text" 
                                                    className="form-control"
                                                    placeholder="Nombre material" 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="form-group">
                                                <label htmlFor="quantitymaterial">
                                                    Cantidad de material
                                                </label>
                                                <input 
                                                    required
                                                    id="quantitymaterial"
                                                    value={materialquantity}
                                                    onChange={(e) => setmaterialquantity(e.target.value)}
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="0" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button color="primary" className="btn btn-primary" type="submit">
                                    Añadir material
                                </button>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                    
                    <Card>
                        {(bidType !== null) &&
                            <CardBody className="border-bottom">
                                <CardTitle className="mb-0 font-weight-bold">
                                    <button onClick={() => backTo()} className="btn btn-unstyled mr-3 text-primary px-4">
                                        <i className="fa fa-angle-left"></i>
                                    </button>
                                    Publicación: { bidType!==null ? <span className="text-muted">{bidType.label}</span> : ''} { skuId!==null ? <span className="text-muted">{", tipo: "+skuId.label}</span> : ''}
                                </CardTitle>
                            </CardBody>
                        }

                        <CardBody>
                            {(bidType === null) &&
                                <div className="step step1 my-2">
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-8">
                                            <div className="text-center">
                                                <h4 className="font-weight-bold">Tipo de publicacion</h4>
                                                <p>Para comenzar, elija el tipo de publicación que desea crear.</p>                                      
                                                <form id="Form" className="form-horizontal mt-2">
                                                    <div className="form-group content form-block-holder">
                                                        <TypeBidSelect icons={true} value={bidType} onChange={changeTypeBid} />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {(bidType !== null && skuId === null && typeof bidType === 'object' && bidType.hasOwnProperty("value")) &&
                                <div className="step my-2">
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-8">
                                            <div className="text-center">
                                                <h4 className="font-weight-bold mb-3">
                                                    <span>{bidType.label}</span> a publicar
                                                </h4>
                                                <p>
                                                    Asocie la publicación con un producto u servicio de su inventario.
                                                </p>
                                                <form id="Form" className="form-horizontal mt-2">
                                                    <div className="form-group content form-block-holder">
                                                        <SkuForBidSelect typeBid={bidType.value} value={skuId} onChange={setskuId} />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {(bidType !== null && steps !== null && skuId !== null) &&
                                <div>
                                    
                                    {Array.isArray(steps) && steps.length > 0 &&
                                        <div className="w-100">
                                            <ul className="step-list">
                                                {steps.map((step, key) => {
                                                    return (
                                                        <li className={activeStep === step ? "active" : ""} key={key}>
                                                            <div className="w-100 content-button">
                                                                <button 
                                                                    //onClick={() => setActiveStep(step)}
                                                                >
                                                                    {Number(steps.indexOf(step)) + 1}
                                                                </button>
                                                            </div>
                                                            <span className="stepname">
                                                                {stepName.find(item => item.name === step).stepname}
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    }

                                    <form onSubmit={(e) => publish(e)} action="">
                                        {(steps.indexOf('title') !== -1 && activeStep === 'title') &&
                                            <div className="step mt-3 ">
                                                <div className="row justify-content-md-center">
                                                    <div className="col col-lg-8">
                                                        <div className="">
                                                            <h4 className="font-weight-bold mb-3">Información comercial</h4>
                                                            
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <div className="form-group content form-block-holder">
                                                                            <label htmlFor="title" className="control-label">
                                                                                Título
                                                                            </label>
                                                                            <div>
                                                                                <input 
                                                                                    id="title"
                                                                                    type="text" 
                                                                                    className="form-control"
                                                                                    placeholder="Ingrese el Titulo de la publicación"
                                                                                    value={title}
                                                                                    onChange={(e) => settitle(e.target.value)}
                                                                                />
                                                                            </div>
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('title')) &&
                                                                                <div className="help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.title}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="form-group content form-block-holder">
                                                                            <label htmlFor="smallDesc" className="control-label">
                                                                                Descripción corta
                                                                            </label>
                                                                            <div>
                                                                                <input 
                                                                                    type="text" 
                                                                                    id="smallDesc"
                                                                                    className="form-control"
                                                                                    placeholder="Descripción corta"
                                                                                    value={smallDesc}
                                                                                    onChange={(e) => setsmallDesc(e.target.value)}
                                                                                />
                                                                            </div>
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('smallDesc')) &&
                                                                                <div className="help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.smallDesc}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group content form-block-holder">
                                                                    <label htmlFor="longDesc" className="control-label">
                                                                        Descripción
                                                                    </label>
                                                                    <div>
                                                                        <textarea 
                                                                        value={longDesc} 
                                                                        onChange={(e) => setlongDesc(e.target.value)}
                                                                        name="longDesc" 
                                                                        id="longDesc" 
                                                                        cols="30" 
                                                                        placeholder="Ingrese una descripcion para su publicacion"
                                                                        className="form-control"
                                                                        rows="5"></textarea>
                                                                    </div>
                                                                    {(typeof errors === 'object' && errors.hasOwnProperty('longDesc')) &&
                                                                        <div className="help-block text-danger font-weight-bold">
                                                                            <small>
                                                                                {errors.longDesc}
                                                                            </small>
                                                                        </div>
                                                                    }
                                                                </div>

                                                                {(bidType.value !== 3) &&
                                                                    <div className="form-group content form-block-holder">
                                                                        <label className="control-label">
                                                                            Categorías
                                                                        </label>
                                                                        <div>
                                                                        <div className="mb-3">
                                                                            <CategoriesLvlTwo 
                                                                                value={categorylvl2}
                                                                                onChange={(values) => changeCat2(values)}
                                                                                categoryParent={idBydTypeInCategories} 
                                                                                list={menuCats}  
                                                                            />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('categorylvl2')) &&
                                                                                <div className="help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.categorylvl2}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                        </div>

                                                                        <div className="mb-3">
                                                                            <CategoriesLvlThree
                                                                                value={categorylvl3}
                                                                                onChange={(values) => changeCat3(values)}
                                                                                categoryParent={idBydTypeInCategories} 
                                                                                categorieslvltwo={categorylvl2}
                                                                                list={menuCats}  
                                                                            />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('categorylvl3')) &&
                                                                                <div className="help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.categorylvl3}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        
                                                                        <div className="mb-3">
                                                                            <CategoriesLvlFour 
                                                                                value={categorylvl4}
                                                                                onChange={(values) => changeCat4(values)}
                                                                                categoryParent={idBydTypeInCategories} 
                                                                                categorieslvltwo={categorylvl2}
                                                                                categorieslvlthree={categorylvl3}
                                                                                list={menuCats}
                                                                            />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('categorylvl4')) &&
                                                                                <div className="help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.categorylvl4}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                }

                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <div className="form-group">
                                                                            <label className="control-label">
                                                                                Disponibilidad
                                                                            </label>
                                                                            <DisponibilitySelect value={disponibilityId} onChange={setdisponibilityId} />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('disponibilityId')) &&
                                                                                <div className="help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.disponibilityId}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="">Etiquetas</label>
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

                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('tags')) &&
                                                                                <div className="help-block my-2 text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.tags}
                                                                                    </small>
                                                                                </div>
                                                                            }

                                                                            <p className="text-muted my-2 small">
                                                                                Usamos las etiquetas para ayudar a los compradores a encontrar tu publicacion.
                                                                            </p>
                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {(steps.indexOf('details') !== -1 && activeStep === 'details') &&
                                            <div className="step mt-3 ">
                                                <div className="row justify-content-md-center">
                                                    <div className="col col-lg-8">
                                                        <div className="">
                                                            <h4 className="font-weight-bold mb-3">Detalles</h4>
                                                                
                                                                <div className="form-group content form-block-holder">
                                                                    <label htmlFor="brandId" className="control-label">
                                                                        Marca:
                                                                    </label>
                                                                    <BrandSelect value={brandId} onChange={(value) => setbrandId(value)} />
                                                                    {(typeof errors === 'object' && errors.hasOwnProperty('brandId')) &&
                                                                        <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                            <small>
                                                                                {errors.brandId}
                                                                            </small>
                                                                        </div>
                                                                    }
                                                                </div>

                                                                {bidType.value === 1 &&
                                                                    <div className="form-group">
                                                                        <label htmlFor="">Razon</label>
                                                                        <ReasonsSelect onChange={(value) => setreasons(value)} value={reasons} />
                                                                        {(typeof errors === 'object' && errors.hasOwnProperty('reasons')) &&
                                                                            <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                <small>
                                                                                    {errors.reasons}
                                                                                </small>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }
                                                                
                                                                {(bidType.value !== 3) &&
                                                                    <div className="form-group">
                                                                        <label htmlFor="include" className="control-label">
                                                                            El producto incluye:
                                                                        </label>
                                                                        <div>
                                                                            <textarea 
                                                                                name="include" 
                                                                                id="include" 
                                                                                cols="30" 
                                                                                rows="2" 
                                                                                className="form-control"
                                                                                placeholder="Adicionales del producto ...."
                                                                                value={include}
                                                                                onChange={(e) => setinclude(e.target.value)}
                                                                            ></textarea>
                                                                        </div>
                                                                        {(typeof errors === 'object' && errors.hasOwnProperty('include')) &&
                                                                            <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                <small>
                                                                                    {errors.include}
                                                                                </small>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }

                                                                {bidType.value === 1 &&
                                                                    <div>
                                                                        <div className="form-group">
                                                                            <CustomInput 
                                                                                checked={customizable == true}
                                                                                onChange={() => setcustomizable(!customizable)}
                                                                                className="d-inline-flex mr-3" 
                                                                                type="checkbox" 
                                                                                id={`customizable`} 
                                                                                name={`customizable`}    
                                                                                label='Producto personalizable' 
                                                                            />
                                                                        </div>
                                                                        {(customizable) &&
                                                                            <div className="form-group">
                                                                                <label htmlFor="customize">
                                                                                    Describa el tipo de personalización
                                                                                </label>
                                                                                <textarea 
                                                                                placeholder="Ingrese el tipo de personalizacion para este producto"
                                                                                name="customize" 
                                                                                value={customize}
                                                                                onChange={(e) => setcustomize(e.target.value)}
                                                                                id="customize" 
                                                                                cols="30" 
                                                                                rows="5" 
                                                                                className="form-control"></textarea>
                                                                                {(typeof errors === 'object' && errors.hasOwnProperty('customize')) &&
                                                                                    <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                        <small>
                                                                                            {errors.customize}
                                                                                        </small>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }

                                                    

                                                                <div className="form-group content form-block-holder">
                                                                    <Materials value={materials} onChange={(value) => setmaterials(value)} />
                                                                    <button onClick={() => setShowModalNewMaterial(true)} type="button" className="btn font-weight-bold btn-block btn-info">
                                                                        Nuevo material
                                                                    </button>
                                                                    {(typeof errors === 'object' && errors.hasOwnProperty('materials')) &&
                                                                        <div className="alert alert-danger mt-3 help-block text-danger font-weight-bold">
                                                                            <small>
                                                                                {errors.materials}
                                                                            </small>
                                                                        </div>
                                                                    }
                                                                </div>

                                                                
                                                                    {(bidType.value !== 3) &&
                                                                        <div className="form-group content form-block-holder">
                                                                            <label className="control-label">
                                                                                Dimensiones (Cm)
                                                                            </label>
                                                                            <div>
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <input 
                                                                                                type="number" 
                                                                                                value={dimension.height}
                                                                                                onChange={(e) => setdimension({...dimension, height: e.target.value})}
                                                                                                className="form-control"
                                                                                                placeholder="Anchura"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <input 
                                                                                                type="number" 
                                                                                                value={dimension.width}
                                                                                                onChange={(e) => setdimension({...dimension, width: e.target.value})}
                                                                                                className="form-control" 
                                                                                                placeholder="Altura"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <input 
                                                                                                type="number" 
                                                                                                value={dimension.depth}
                                                                                                onChange={(e) => setdimension({...dimension, depth: e.target.value})}
                                                                                                className="form-control" 
                                                                                                placeholder="Profundidad"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div> 
                                                                    }

                                                                    <div className="row">
                                                                        
                                                                            <div className="col-lg-4">
                                                                                <div className="d-flex align-items-center mb-3">
                                                                                    <label htmlFor="weight" className="control-label mb-0 mr-3">
                                                                                        Peso (Kg):
                                                                                    </label>
                                                                                    <div>
                                                                                        <input 
                                                                                            style={{width: '100px'}}
                                                                                            type="number" 
                                                                                            id="weight"
                                                                                            min="0"
                                                                                            className="form-control"
                                                                                            placeholder="Peso (Kg)"
                                                                                            value={weight}
                                                                                            onChange={(e) => setweight(e.target.value)}
                                                                                        />
                                                                                    </div>
                                                                                </div>   
                                                                                {(typeof errors === 'object' && errors.hasOwnProperty('weight')) &&
                                                                                    <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                        <small>
                                                                                            {errors.weight}
                                                                                        </small>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        

                                                                    {(bidType.value === 1) &&
                                                                        <div className="col-lg-8">
                                                                            <div className="d-flex align-items-center mb-0">
                                                                                <label htmlFor="time" className="control-label mb-0 mr-3">
                                                                                    Duracion de fabricacion (Días):
                                                                                </label>
                                                                                <div>
                                                                                    <input 
                                                                                        style={{width: '75px'}}
                                                                                        type="number" 
                                                                                        id="time"
                                                                                        min="0"
                                                                                        className="form-control"
                                                                                        placeholder="Días"
                                                                                        value={time}
                                                                                        onChange={(e) => settime(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <p className="mb-3 d-none small text-muted">
                                                                                (En caso de que no haya stock)
                                                                            </p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="row align-items-center">
                                                                <div className="col-lg-5">
                                                                    <div>
                                                                        <CustomInput 
                                                                            checked={devolution == true}
                                                                            onChange={() => setdevolution(!devolution)}
                                                                            className="d-inline-flex mr-3" 
                                                                            type="checkbox" 
                                                                            id={`customizable`} 
                                                                            name={`Devoluciones`}    
                                                                            label='¿Acepta devoluciones?' 
                                                                        />
                                                                    </div>
                                                                </div>
                                                                    <div className="col-lg-7">
                                                                    {(bidType.value !== 3) &&
                                                                    <div className="row align-items-center">
                                                                        <div className="col-lg-6">
                                                                            <div>
                                                                                <CustomInput 
                                                                                    checked={garanty == true}
                                                                                    onChange={() => setgaranty(!garanty)}
                                                                                    className="d-inline-flex mr-3" 
                                                                                    type="checkbox" 
                                                                                    id={`garanty`} 
                                                                                    name={`garanty`}    
                                                                                    label='¿Posee garantía?' 
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            {(garanty === true) &&
                                                                                <div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <label htmlFor="garanty_days" className="control-label mr-3 mb-0">
                                                                                        Días
                                                                                    </label>
                                                                                    <div>
                                                                                        <input 
                                                                                            style={{width: '75px'}}
                                                                                            type="number" 
                                                                                            id="garanty_days"
                                                                                            min="0"
                                                                                            className="form-control"
                                                                                            placeholder="Días de garantia"
                                                                                            value={garantyDays}
                                                                                            onChange={(e) => setgarantyDays(e.target.value)}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                }
                                                                    </div>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {(steps.indexOf('customization') !== -1 && activeStep === 'customization') &&
                                            <div>
                                                <div className="step step1 mt-3 ">
                                                    <div className="row justify-content-md-center">
                                                        <div className="col col-lg-8">
                                                            <div className="mb-3">
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
                                        }

                                        {(steps.indexOf('media') !== -1 && activeStep === 'media') &&
                                            <div>
                                                <div className="step step1 mt-3 ">
                                                    <div className="row justify-content-md-center">
                                                        <div className="col col-lg-8">
                                                            <div className="mb-3">
                                                                <h4 className="font-weight-bold mb-0">Media</h4>
                                                                <small className="text-muted mb-2">Adjuntar archivos</small>
                                                            </div>
                                                            <h5 className="mb-1 h6 font-weight-bold">Fotos:</h5>

                                                            <p className="mb-3 small text-muted">
                                                                La foto que se mostrara en las busquedas y con la cual sera representada la publicacion.
                                                            </p>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="photo1">
                                                                            <strong className="text-primary">Principal</strong>
                                                                        </label>
                                                                        
                                                                        <InputPhotos value={photo1} onChange={(photo) => setphoto1(photo)} max={1} />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('photo1')) &&
                                                                                <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.photo1}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="photo2">
                                                                            <strong>Con angulos</strong>
                                                                        </label>
                                                                        <InputPhotos value={photo2} onChange={(photo) => setphoto2(photo)} max={1} />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('photo2')) &&
                                                                                <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.photo2}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="photo3">
                                                                            <strong>Comparacion de escala</strong>
                                                                        </label>
                                                                        <InputPhotos value={photo3} onChange={(photo) => setphoto3(photo)} max={1} />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('photo3')) &&
                                                                                <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.photo3}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="photo4">
                                                                            <strong>Siendo usado</strong>
                                                                        </label>
                                                                        <InputPhotos value={photo4} onChange={(photo) => setphoto4(photo)} max={1} />
                                                                            {(typeof errors === 'object' && errors.hasOwnProperty('photo4')) &&
                                                                                <div className="alert alert-danger help-block text-danger font-weight-bold">
                                                                                    <small>
                                                                                        {errors.photo4}
                                                                                    </small>
                                                                                </div>
                                                                            }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            {(bidType !== null) &&
                                                                <div className="form-group">
                                                                    <label htmlFor="video">Añadir video 
                                                                        (<span className="text-muted font-weight-bold">
                                                                            url de youtube
                                                                        </span>)
                                                                    </label>
                                                                    <input 
                                                                        value={urlVideos}
                                                                        onChange={(e) => seturlVideos(e.target.value)}
                                                                        id="video"
                                                                        type="text" 
                                                                        name="video"
                                                                        className="form-control" 
                                                                        placeholder="Url del video"
                                                                    />
                                                                    {(typeof errors === 'object' && errors.hasOwnProperty('video')) &&
                                                                        <div className="alert alert-danger help-block text-danger my-2 font-weight-bold">
                                                                            <small>
                                                                                {errors.video}
                                                                            </small>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <hr/>
                                        <div className="row pt-3 justify-content-center">
                                        <div className="col-8">
                                            <div className="d-flex align-items-center justify-content-between">
                                                {(steps.indexOf(activeStep) + 1) <= (Number(steps.length)) && ((steps.indexOf(activeStep) + 1) > 1) ?
                                                    <button 
                                                        type="button"
                                                        disabled={sending}
                                                        onClick={() => backStep()}
                                                        className="btn btn-lg btn-light px-4 font-weight-bold"
                                                    >
                                                        <i className="fa fa-angle-left mr-3"></i>Atras
                                                    </button>
                                                    :
                                                    <div></div>
                                                }

                                                {(steps.indexOf(activeStep) + 1) < (Number(steps.length))
                                                ?
                                                    <button 
                                                        type="button"
                                                        disabled={sending}
                                                        onClick={() => nextStep()}
                                                        className="btn btn-lg btn-info px-4 font-weight-bold"
                                                    >
                                                        Siguiente<i className="fa fa-angle-right ml-3"></i>
                                                    </button>
                                                :
                                                    <button 
                                                        disabled={disableInput || sending}
                                                        type="submit"
                                                        className="btn btn-lg btn-primary px-4 font-weight-bold"
                                                    >
                                                        {!sending    ? "Publicar" : <i className="fa-spin fa-spinner fa"></i>}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            }
                        </CardBody>
                    </Card>
                </div>
            )
        }else{
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">
                        Nueva publicación
                    </h1>
                    <div className="card">
                        <div className="card-body py-5">
                            <h4 className="font-weight-bold h3 text-center">
                                {successmessage}
                            </h4>
                            <div className="text-center">
                                <button onClick={() => reset()} className="btn btn-primary">
                                    Crear otra publicación
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    Nueva publicación
                </h1>
                <div>
                    <InlineSpinner />
                </div>
            </div>
        )
    }
}

export default BidsSellerAd
