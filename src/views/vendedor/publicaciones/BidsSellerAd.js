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
    ModalFooter,
    Row,
    Col,
    Progress,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';

import PrincipalCategoriesSelect from '../../../components/selects/PrincipalCategoriesSelect';
import MultipleFileInput from '../../../components/files/MultipleFileInput';
import SkuTypeSelect from '../../../components/selects/SkuTypeSelect';
import ServicesSelect from '../../../components/selects/servicesSelect';
import MaterialOffSelect from '../../../components/selects/MaterialOffSelect';
import CategoriesSelect from '../../../components/selects/CategoriesSelect';
import ProductSelect from '../../../components/selects/ProductSelect';

import CheckColors from '../../../components/helpers/CheckColors';
import SizesCombobox from '../../../components/helpers/SizesCombobox';

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

function BidsSellerAd(props) {

    const [isEdit, setisEdit] = useState(props.edit ? true : false);
    const [bidToEdit, setbidToEdit] = useState(props.bidSelectedByEdit ? props.bidSelectedByEdit : null);

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
    const [BidId,   setBidId]                           = useState(null);

    const [title,   settitle]                           = useState('');
    const [brandId, setbrandId]                         = useState(null);

    const [longDesc,        setlongDesc]                = useState(''); 
    const [smallDesc,       setsmallDesc]               = useState(''); 
    const [disponibilityId, setdisponibilityId]         = useState(null);
    const [time,            settime]                    = useState(0);
    const [devolution,      setdevolution]              = useState(true);

    const [category,        setcategory]                = useState(null);
    const [categorylvl2,    setcategorylvl2]            = useState(null);
    const [categorylvl3,    setcategorylvl3]            = useState(null);
    const [categorylvl4,    setcategorylvl4]            = useState(null);

    const [include,         setinclude]                 = useState(''); 
    const [customize,       setcustomize]               = useState("");
    const [customizable,    setcustomizable]            = useState(false);
    const [garanty,         setgaranty]                 = useState(false);
    const [garantyDays,     setgarantyDays]             = useState(0);
    const [tags,            setTags]                    = useState([]);

    const [urlVideos,   seturlVideos]                   = useState('');
    const [materials,   setmaterials]                   = useState(null);
    const [weight,      setweight]                      = useState('');
    const [photos,      setphotos]                      = useState([]);

    const [typePhotos, settypePhotos]                   = useState(null);
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

    const [variationList,    setvariationList]          = useState([]);
    const [variation,        setvariation]              = useState([]);
    const [countvariation,   setcountvariation]         = useState(0);
    const maxVariations = 5;
    const [stock,            setstock]                  = useState(null);

    const [materialName, setmaterialName]               = useState("");
    const [materialquantity, setmaterialquantity]       = useState("");   

    const [progress, setprogress]                       = useState(0);
    const [count, setcount]                             = useState(0);

    const [showModalNewMaterial, setShowModalNewMaterial] = useState(false);
    const toggle = () => setShowModalNewMaterial(!showModalNewMaterial);

    const session = useSelector(state => state.session);
    let shopId = session.userData.shop.id;

    let stepName = [
        {name: 'title',             stepname: 'Información comercial'},
        {name: 'media',             stepname: 'Media'},
        {name: 'details',           stepname: 'Detalles'},
        {name: 'variations',        stepname: 'Variaciones'},
        {name: 'customization',     stepname: 'Personalización'},
    ];

    //VARIATIONS======================================================================
    const addVariation = () => {
        console.log('Añadiendo variacion');
        let id = variation.length + 1;
        let variationList = variation;
        let newVariation = 
        {
                id,
                category: null,
                sizetype: null,
                size: null,
                quantity:"",
                discount:'',
                color:""
        };

        variationList.push(newVariation);
        console.log(variationList);

        setvariation(variationList);
        setcountvariation(countvariation + 5);
    }

    const changeVariationData = (id, keyName, value) => {
        let variationList = variation;
        for (let i = 0; i < variationList.length; i++) {
            const element = variationList[i];
            if(element.id === id){
                console.log('Cambiando:'+keyName+' a:'+value);
                element[keyName] = value;
            }
        }

        setvariation(variationList);
        setcountvariation(countvariation + 5);
    }

    const deleteVariation = (id) => {
        //alert(phoneNumber);
        let variationList = variation;
        variationList.splice(id - 1, 1);
        let newVariationList = [];
        console.log(variationList);

        for (let i = 0; i < variationList.length; i++) {
            let format = variationList[i];
            format.id = i + 1;
            newVariationList.push(format);
        }

        console.log(newVariationList);
        setvariation(newVariationList);
        setcountvariation(countvariation + 5);
    }
    // ==============================================================================

    //CHANGE STEPS ==========================================================
    const changeTypeBid = (value) => {
        if(value.value === 1){
            setsteps([
                'title',
                'details',
                "variations",
                'media'
            ]);
            setActiveStep('title');
            setbidType(value);
        }else if(value.value === 2){
            setsteps([
                'title',
                'details',
                "variations",
                'media'
            ]);
            setActiveStep('title');
            setbidType(value);
        }else if(value.value === 3){
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
    //===========================================================================

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

            if(weight === "" && bidType.value !== 3){
                thiserrors.weight = "Debe añadir el peso.";
                countErrors++;
            }        
        }

        if(actualStep === "variations"){
            if(variation.length > 0){
                let variationList = variation;
                let variationErrorsCount = 0;
                let variationstotalquantity = 0;
    
                for (let i = 0; i < variationList.length; i++) {
                    const variation = variationList[i];

                    if(variation.category === null){
                        variationErrorsCount++;
                    }

                    if(variation.sizetype === null){
                        variationErrorsCount++;
                    }
    
                    if(variation.size === null){
                        variationErrorsCount++;
                    }
    
                    if(variation.quantity === '' || Number(variation.quantity) === 0){
                        variationErrorsCount++;
                    }
    
                    if(variation.quantity === '' || Number(variation.quantity) === 0){
                        variationErrorsCount++;
                    }else{
                        variationstotalquantity = Number(variationstotalquantity) + Number(variation.quantity);
                    }
    
                    if(variation.color === ''){
                        variationErrorsCount++;
                    }
                }
    
                if(variationErrorsCount > 0){
                    countErrors++;
                    thiserrors.variations = 'Revise las variaciones y sus parametros, recuerde que debe completar los datos de la variación en su totalidad.';
                }

                if(Number(variationstotalquantity) > Number(stock)){
                    countErrors++;
                    thiserrors.variations = 'Las cantidades sumadas de productos por variación no deben exceder a la cantidad de productos ingresados en el lote';
                }
                
                if(Number(variationstotalquantity) !== Number(stock)){
                    countErrors++;
                    thiserrors.variations = 'Las cantidades sumadas de productos por variación deben ser iguales a la cantidad total del lote '+stock+'';
                }  
    
                if(variation.length < 2){
                    countErrors++;
                    thiserrors.variations = 'Debe registrar un mínimo de 2 variaciones.';
                }
            }
        }

        if(actualStep === "media"){
            if(Array.isArray(typePhotos) && typePhotos.length > 0){
                for (let i = 0; i < typePhotos.length; i++) {
                    const type = typePhotos[i];
                    //console.log(type);
    
                    let findPhoto = photos.find(item => Number(item.attachmentTypeId) === Number(type.id));
                    //console.log(findPhoto);
    
                    if(findPhoto.data === null){
                        thiserrors.photos = "Debe insertar todas las fotografias de forma obligatoria";
                        countErrors++;
                    }
                }
            }

            if(urlVideos !== ""){
                let regvideo = /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])/;
                if(!regvideo.test(urlVideos)){
                    thiserrors.video = "La url ingresada debe corresponder a un video de youtube";
                    countErrors++;
                }
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
            }
        */

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

        if(weight === "" && bidType.value !== 3){
            thiserrors.weight = "Debe añadir el peso.";
            countErrors++;
            errorInStep = "details";
        }
        
        //media

        if(Array.isArray(typePhotos) && typePhotos.length > 0){
            for (let i = 0; i < typePhotos.length; i++) {
                const type = typePhotos[i];
                //console.log(type);

                let findPhoto = photos.find(item => Number(item.attachmentTypeId) === Number(type.id));
                //console.log(findPhoto);

                if(findPhoto.data === null){
                    errorInStep = "media";
                    countErrors++;
                    thiserrors.photos = "Debe insertar todas las fotografias de forma obligatoria";
                }
            }
        }

        if(urlVideos !== ""){
            //console.log("url:"+urlVideos);
            let regvideo = /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])/;
            if(!regvideo.test(urlVideos)){
                thiserrors.video = "La url ingresada debe corresponder a un video de youtube";
                countErrors++;
                errorInStep = "media";
            }
        }

        if(countErrors > 0){
            console.log(errorInStep);

            if(errorInStep !== ''){
                setActiveStep(errorInStep);
                seterrors(thiserrors);
            }

            return false;
        }else{
            return true;
        }
    }

    //FORMAT ARRAYS ==================================================================
    const formatArrayToEdit = (arrayData) => {
        let newData = [];
        if(arrayData.length > 0){
            for (let i = 0; i < arrayData.length; i++) {
                const element = arrayData[i];
                let newItemData      = {};
                newItemData.value    = element.id;
                newItemData.label    = element.name;

                newData.push(newItemData);
            }
        }

        return newData;
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
    //==========================================================================

    const publishService = () => {
        let url = "/seller/puBLIctIons/bid/aDd";
        
        if(isEdit){
            url = "/SElLeR/BidUpDAte/requeST";
        }

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

        let newPhotos = [];
        if(Array.isArray(photos) && photos.length > 0){
            for (let i = 0; i < photos.length; i++) {
                let thisPhoto = photos[i];
                
                let newPhotoFormatted               = {};
                newPhotoFormatted.attachmentTypeId  = thisPhoto.attachmentTypeId;
                newPhotoFormatted.data              = thisPhoto.data[0].type+","+thisPhoto.data[0].url;
            
                newPhotos.push(newPhotoFormatted);
            }
        }

        let data = {};

        if(!isEdit){
            data = {
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

                photos: newPhotos
            }
        }else{
            data.bidId  = BidId;
            data.change = {
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
                photos: newPhotos
            }
        }

        console.log(data);
        setsending(true);
        
        axios({
            method: isEdit ? "post" : "post",
            data,
            url,
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted);
                setprogress( percentCompleted );
                setcount(count * percentCompleted);
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsending(false);
                setprogress(0);

                if(!isEdit){
                    setpublished(true);
                    setsuccessmessage(res.data.data.message);
                }else{
                    props.reset(res.data.data.message);
                    window.scrollTo({top: 50, behavior: 'smooth'});
                }
            }else{
                setsending(false);
                setprogress(0);
                seterrormessage(res.data.data.message);
                window.scrollTo({top: 50, behavior: 'smooth'});
            }
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    const publishProduct = () => {
        let url = "/seller/puBLIctIons/bid/aDd";

        if(isEdit){
            url = "/SElLeR/BidUpDAte/requeST";
        }

        let newPhotos = [];
        if(Array.isArray(photos) && photos.length > 0){
            for (let i = 0; i < photos.length; i++) {
                let thisPhoto = photos[i];
                
                let newPhotoFormatted               = {};
                newPhotoFormatted.attachmentTypeId  = thisPhoto.attachmentTypeId;
                newPhotoFormatted.data              = thisPhoto.data[0].type+","+thisPhoto.data[0].url;
            
                newPhotos.push(newPhotoFormatted);
            }
        }

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

        let data = {}

        if(bidType.value === 2){

            // MATERIALES --------------------------------

            if(!isEdit){
                data = {
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
    
                    photos: newPhotos
                }
            }else{
                data.bidId = BidId;
                data.change = {
                    //bidType: bidType.value,
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
    
                    photos: newPhotos
                }
            }

        }else if(bidType.value === 1){

            //Phm ---------------------------------------
            if(!isEdit){
                data = {
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
                    
                    photos: newPhotos
                }
            }else{
                data.bidId  = BidId;
                data.change = {
                    //bidType: bidType.value,
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
                    
                    photos: newPhotos
                }
            }
        }


        if(variation.length > 0){
            let variationList = variation;
            let newvariationList = [];

            for (let i = 0; i < variationList.length; i++) {
                const element = variationList[i];
                let formatVariation = {};

                formatVariation.category    = element.category.value;
                formatVariation.sizetype    = element.sizetype.value;
                formatVariation.size        = element.size.value;

                formatVariation.quantity    = element.quantity;
                formatVariation.discount    = element.discount;
                formatVariation.color       = element.color;

                newvariationList.push(formatVariation);
            }

            console.log(newvariationList);

            if(!isEdit){
                data.variations = newvariationList;
            }else{
                data.change.variations = newvariationList;
            }

        }else{
            if(!isEdit){
                data.variations         = null;
            }else{
                data.change.variations  = null;
            }
        }

        setsending(true);
        console.log(data);
        
        axios({
            method: isEdit ? "post" : "post",
            data,
            url,
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted);
                setprogress( percentCompleted );
                setcount(count * percentCompleted);
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsending(false);

                if(!isEdit){
                    setpublished(true);
                    setsuccessmessage(res.data.data.message);
                }else{
                    props.reset(res.data.data.message);
                }

            }else{
                seterrormessage(res.data.data.message);
                setprogress(0);
                window.scrollTo({top: 50, behavior: 'smooth'});
                setsending(false);
            }
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    const publish = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setsuccessmessage("");
        seterrormessage("");

        let url = "/seller/puBLIctIons/bid/aDd";

        if(bidType.value === 3){

            let isValid = validate();
            if(isValid){
                publishService();
            }

        }else if(bidType.value !== 3){
            let isValid = validate();
            if(isValid){
                publishProduct();
            }
        }
    }      

    const getDataByEdit = () => {
        let urlBid = `/sEtTiNg/BiD/GET/OnE/${shopId}/${props.bidSelectedByEdit}`;
        let urlPhotos = `/bID/GET/IMge/byBID/${props.bidSelectedByEdit}`;

        axios.get(urlBid)
        .then((res) => {
            console.log(res.data);
            let bid = res.data;
            let skutypeIdData = {value: bid.skuType.id, label: bid.skuType.name};

            setBidId(bid.id);
            setbidType(skutypeIdData);

            let dataSku = {value: bid.skuId, label: bid.title};

            setsku(dataSku);
            changeTypeBid(skutypeIdData);

            //title

            settitle(bid.title);
            setsmallDesc(bid.smallDesc);
            setlongDesc(bid.longDesc);

            setTags(bid.tags);
            setdisponibilityId({label: bid.disponibility.name, value: bid.disponibility.id})

            if(Number(bid.skuTypeId) !== 3){
                let subcat1 = (bid.category.cat1s.subCat.subCat1 !== null && Array.isArray(bid.category.cat1s.subCat.subCat1)) ? formatArrayToEdit(bid.category.cat1s.subCat.subCat1) : [];
                let subcat2 = (bid.category.cat1s.subCat.subCat2 !== null && Array.isArray(bid.category.cat1s.subCat.subCat2)) ? formatArrayToEdit(bid.category.cat1s.subCat.subCat2) : [];
                let subcat3 = (bid.category.cat1s.subCat.subCat3 !== null && Array.isArray(bid.category.cat1s.subCat.subCat3)) ? formatArrayToEdit(bid.category.cat1s.subCat.subCat3) : [];
                let subcat4 = (bid.category.cat1s.subCat.subCat4 !== null && Array.isArray(bid.category.cat1s.subCat.subCat4)) ? formatArrayToEdit(bid.category.cat1s.subCat.subCat4) : [];
            
                setcategorylvl2(subcat1);
                setcategorylvl3(subcat2);
                setcategorylvl4(subcat3);

                setstock(bid.stock.total);
            }else{
                setcategorylvl2([]);
                setcategorylvl3([]);
                setcategorylvl4([]);

                setstock(bid.stock.total);
            }

            //details

            console.log(bid.Brand);

            setbrandId({label: bid.Brand.name, value: bid.Brand.id});
            setinclude(bid.include ? bid.include : "");

            setcustomizable(bid.customizable !== null   ? bid.customizable  : false);
            setcustomize(bid.customize !== null         ? bid.customize     : false);

            setdevolution(bid.devolution);
            if(bid.garanty !== null && Number(bid.garanty) > 0){
                setgaranty(true);
                setgarantyDays(Number(bid.garanty));
            }else{
                setgaranty(false);
            }

            settime(bid.time);
            setweight(bid.weight ? bid.weight : 0);

            let formatMaterial = [];

            if(Array.isArray(bid.materials) && bid.materials.length > 0){

                let materialit = 0;

                for (let i = 0; i < bid.materials.length; i++) {
                    const material = bid.materials[i];

                    let newMaterial     = {};
                    newMaterial.id      = materialit + 1;
                    newMaterial.qty     = material.qty;
                    newMaterial.type    = {label: material.name, value: material.id}

                    formatMaterial.push(newMaterial);
                    materialit++;
                }
            }

            if(Number(bid.skuTypeId) !== 3){
                if(bid.dimension !== null && Array.isArray(bid.dimension)){
                    setdimension({
                        depth:  bid.dimension[0].depth, 
                        width:  bid.dimension[0].width, 
                        height: bid.dimension[0].height
                    });
                }
            }

            console.log(formatMaterial);
            setmaterials(formatMaterial);

            function isBase64(str) {
                if (str ==='' || str.trim() ===''){ return false; }
                try {
                    return btoa(atob(str)) == str;
                } catch (err) {
                    return false;
                }
            }

            //SET PHOTOS------------------------------------
            axios.get(urlPhotos)
            .then((res) => {

                let newPhotos = [];

                if(res.data.data !== null && res.data.data !== undefined && res.data.data.hasOwnProperty("result") && res.data.data.result === false){

                    setloading(false);

                }else{
                    if(Array.isArray(res.data)){
                        for (let i = 0; i < res.data.length; i++) {
                            const item = res.data[i];
                            console.log(item);
                            if(Array.isArray(item.img.data)){

                                let imagen = item.img.data.reduce(
                                    function (data, byte) {
                                        return data + String.fromCharCode(byte);
                                    },
                                    ''
                                );

                                let separator = imagen.split(",");
                                let type      = separator[0];
                                imagen        = separator[separator.length - 1];

                                //console.log(separator);
                                //console.log(imagen);
                                //console.log(type);

                                let newData = {};
                                let newItem = {}

                                if(isBase64(imagen)){
                                    newData = [{
                                        id:newPhotos.length+1,
                                        name: "imagen_"+newPhotos.length,
                                        type: type,
                                        url:  separator[1]+","+separator[2]
                                    }];
                                }else{
                                    newData = [{
                                        id:newPhotos.length+1,
                                        name: "imagen_"+newPhotos.length,
                                        type: null,
                                        url:  null
                                    }];
                                }

                                newItem.attachmentTypeId = item.type;
                                newItem.data = newData;

                                newPhotos.push(newItem);
                            }
                        }
                    }

                    console.log(newPhotos);
                    setphotos(newPhotos);
                    console.log("PHOTOS");
                    console.log(newPhotos);
    
                    //setphoto1([newPhotos[0]]);
                    //setphoto2([newPhotos[1]]);
                    //setphoto3([newPhotos[2]]);
                    //setphoto4([newPhotos[3]]);

                    console.log(newPhotos);
    
                    setphotos(newPhotos);
                    setloading(false);
                }
            }).catch((err) => {
                console.error(err);
            });

        }).catch((err) => {
            console.error(err);
        });
    }
    
    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                let url = '/menu';
                let urlGetVariations = 'https://intimi.vps.co.ve/inner/pampatarStatic/data/variations.json';
                let urlTypePhotos = "/aTTacHMEnt/Get/TypeS";

                axios.get(url).then((res) => {
                    setmenuCats(res.data.data.menu);
                    axios.get(urlGetVariations)
                    .then((res) => {
                        setvariationList(res.data);

                        axios.get(urlTypePhotos)
                        .then((res) => {

                            console.log(res.data);
                            let types = res.data;
                            settypePhotos(types);

                            let newPhotos = [];

                            if(Array.isArray(types) && types.length > 0){
                                for (let i = 0; i < types.length; i++) {
                                    const itemphoto             = types[i];
                                    console.log(itemphoto);

                                    let thisPhoto                = {};
                                    thisPhoto.attachmentTypeId   = itemphoto.id;
                                    thisPhoto.data               = null;

                                    newPhotos.push(thisPhoto);
                                }

                                console.log(newPhotos);
                                setphotos(newPhotos);

                                if(!isEdit){
                                    setloading(false);
                                }else{
                                    //BUSCANDO DATOS PARA EDICION
                                    getDataByEdit();
                                }
                            }
                        }).catch((err) => {
                            console.error(err);
                        });
                    }).catch((err) => {
                        console.error(err);
                    });
                });
            }
        }else{
            if(bidToEdit !== props.bidSelectedByEdit && isEdit){
                console.log(props.bidSelectedByEdit);

                setbidToEdit(props.bidSelectedByEdit);
                setloading(true);
                getDataByEdit();
            }

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

        let newPhotos = [];
        
        for (let i = 0; i < typePhotos.length; i++) {
            const itemphoto             = typePhotos[i];
            console.log(itemphoto);

            let thisPhoto                = {};
            thisPhoto.attachmentTypeId   = itemphoto.id;
            thisPhoto.data               = null;

            newPhotos.push(thisPhoto);
        }

        console.log(newPhotos);
        setphotos(newPhotos);

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
        setprogress(0);
        setcount(0);
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

    const setsku = (val) => {
        console.log(bidType);
        console.log(val);

        if(bidType !== null && typeof bidType === "object" && bidType.hasOwnProperty("value") && bidType.value === 3){
            setskuId(val);
        }else if(bidType === null || (typeof bidType === "object" && bidType.value !== 3)){
            console.log("Buscando stock del producto/material");
            let urlstock = '/stock/GET/AlL/byPrO-Ser/'+val.value+'/product/'+shopId+'';
            setskuId(val);

            axios.get(urlstock).then((res) => {
                console.log("stock encontrado!:",res.data.data.stock);
                setstock(res.data.data.stock);
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    const newDataPhoto = (data, photoid) => {
        console.log(photos);
        console.log(data);
        
        let photoList   = photos;
        let searchPhoto = photoList.find(photo => photo.attachmentTypeId === photoid);
        let index = photoList.indexOf(searchPhoto);

        console.log(photoid);
        console.log(photoList);
        console.log(searchPhoto);
        console.log(index);

        searchPhoto.data = data;
        photoList[index] = searchPhoto;
        setphotos(photoList);

        console.log(photoList);
        setcount(count + 10);
        
    }

    //console.log(photos);

    if(!loading){
        if(!published){
            return (
                <div>
                    {(!isEdit) &&
                        <Breadcrumb listClassName="px-0">
                            <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                            <BreadcrumbItem active>Nueva publicación</BreadcrumbItem>
                        </Breadcrumb>
                    }


                    {(!isEdit) &&
                        <h1 className="h4 mb-3 font-weight-bold">
                            Nueva publicación
                        </h1>
                    }

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
                    
                    {(errormessage !== "") &&
                        <div className="alert alert-danger shadow-sm">
                            <p className="mb-0 font-weight-bold">
                                {errormessage}
                            </p>
                        </div>
                    }

                    <Card>
                        {(bidType !== null) &&
                            <CardBody className="border-bottom">
                                <CardTitle className="mb-0 font-weight-bold">
                                    {(!isEdit) &&
                                        <button onClick={() => backTo()} className="btn btn-unstyled mr-3 text-primary px-4">
                                            <i className="fa fa-angle-left"></i>
                                        </button>
                                    }
                                    Publicación: 
                                    <h3>{ bidType!==null ? <span className="text-info font-weight-bold">{bidType.label}</span> : ''} { skuId!==null ? <span className="text-muted font-weight-bold">{", "+skuId.label}</span> : ''}</h3>
                                </CardTitle>
                            </CardBody>
                        }

                        <CardBody>
                            {(bidType === null && !isEdit) &&
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
                                                        <SkuForBidSelect typeBid={bidType.value} value={skuId} onChange={(val) => setsku(val)} />
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
                                                                    {(bidType.value !== 3) &&
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
                                                                    }
                                                                        

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

                                        {(steps.indexOf('variations') !== -1 && activeStep === 'variations') &&
                                            <div>
                                                <div className="step step1 mt-3 ">
                                                    <div className="row justify-content-md-center">
                                                        <div className="col col-lg-8">
                                                            <div className="mb-3">
                                                                <h4 className="font-weight-bold">Variaciones</h4>
                                                            </div>
                                                            <div className="mb-3 alert alert-info">
                                                                <p className="mb-0 font-weight-bold">
                                                                    Stock del articulo: {stock}
                                                                </p>
                                                            </div>
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('variations')) ?
                                                                <div className="alert alert-danger font-weight-bold">
                                                                    <p className="mb-0 small">
                                                                        {errors.variations}
                                                                    </p>
                                                                </div>
                                                                :
                                                                <div className="alert alert-info">
                                                                    <p className="mb-0 small">
                                                                        <strong>Nota:</strong> Las variaciones se utilizan para definir algunas características de las prendas de vestir.
                                                                    </p>
                                                                </div>
                                                            }

                                                            {variation.length > 0 && variation.length && variation.map((item, key) => {
                                                                let search = variation.filter(data => data.id === item.id);
                                                                let activeForm = search.length > 0;
                                                                
                                                                return (
                                                                    <div className="content-variation" key={key}>
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                            <h6 className="font-weight-bold mb-0">
                                                                                Variación #{item.id} 
                                                                            </h6>
                                                                            <button 
                                                                            type="button" onClick={() => deleteVariation(item.id)} 
                                                                            className="btn ml-3 btn-primary btn-sm">
                                                                                <i className="fa fa-times"></i>
                                                                            </button>
                                                                        </div>
                                                                        <hr/>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="">Talla</label>
                                                                                    <SizesCombobox 
                                                                                        list={variationList.TALLAS} 

                                                                                        category={(activeForm) ? search[0].category : '' } 
                                                                                        sizetype={(activeForm) ? search[0].sizetype : '' } 
                                                                                        size={(activeForm) ? search[0].size : '' } 

                                                                                        onChangeCategory={(data)    => changeVariationData(item.id, 'category', data)}
                                                                                        onChangeSizeType={(data)    => changeVariationData(item.id, 'sizetype', data)}
                                                                                        onChangeSize={(data)        => changeVariationData(item.id, 'size',     data)} 
                                                                                    />
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="6">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="">Cantidad</label>
                                                                                    <input 
                                                                                        type="number" 
                                                                                        placeholder="Cantidad"
                                                                                        min="0"
                                                                                        onChange={(e) => changeVariationData(item.id, 'quantity', e.target.value)}
                                                                                        value={(activeForm) ? search[0].quantity : '' }
                                                                                        className="form-control"
                                                                                    />
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="6">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="">Descuento <i className="fa fa-percent ml-2"></i></label>
                                                                                    <input 
                                                                                        type="number"
                                                                                        placeholder="Descuento"
                                                                                        min="0" 
                                                                                        onChange={(e) => changeVariationData(item.id, 'discount', e.target.value)}
                                                                                        value={(activeForm) ? search[0].discount : '' }
                                                                                        className="form-control"
                                                                                    />
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs="12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="">Color:</label>
                                                                                    <CheckColors id={item.id} onChange={(data) => changeVariationData(item.id, 'color', data)} value={(activeForm) ? search[0].color : '' } list={variationList.COLORES} />
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                )
                                                            })}

                                                            {(variation.length < maxVariations) &&
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => addVariation()} 
                                                                    className="btn btn-outline-info font-weight-bold btn-block w-100"
                                                                >
                                                                    <i className="fa fa-plus mr-2"></i>Añadir variación
                                                                </button>
                                                            }          
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

                                                            {(typeof errors === 'object' && errors.hasOwnProperty('photos')) &&
                                                                <div className="alert alert-danger help-block text-danger my-3 font-weight-bold">
                                                                    <small>
                                                                        {errors.photos}
                                                                    </small>
                                                                </div>
                                                            }

                                                            <div className="row">
                                                                {(typePhotos !== null && Array.isArray(typePhotos) && typePhotos.map((item, key) => {

                                                                    let thisPhoto = photos.find(photo => photo.attachmentTypeId === item.id);

                                                                    return (
                                                                        <div key={key} className="col-lg-6">
                                                                            <div className="form-group">
                                                                                <label htmlFor="photo1">
                                                                                    <strong className="text-dark">
                                                                                        {item.name} 
                                                                                        <span className="d-none">
                                                                                            {thisPhoto.attachmentTypeId}
                                                                                        </span>
                                                                                    </strong>
                                                                                </label>

                                                                                <InputPhotos 
                                                                                    value={thisPhoto.data} 
                                                                                    onChange={(photo) => newDataPhoto(photo, thisPhoto.attachmentTypeId)} 
                                                                                    max={1} 
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }))}
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

                                        { (progress > 0) &&
                                            <Progress striped color="success" value={progress} />
                                        }

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
                                                
                                                {!isEdit 
                                                ?
                                                    <>
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
                                                    </>
                                                :
                                                    <>
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
                                                                className="btn btn-lg btn-warning px-4 font-weight-bold"
                                                            >
                                                                {!sending    ? "Editar publicación" : <i className="fa-spin fa-spinner fa"></i>}
                                                            </button>
                                                        }
                                                    </>
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
                    {(!isEdit) &&
                        <Breadcrumb listClassName="px-0">
                            <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                            <BreadcrumbItem active>Nueva publicación</BreadcrumbItem>
                        </Breadcrumb>
                    }
                    <h1 className="h4 mb-3 font-weight-bold">
                        Nueva publicación
                    </h1>
                    <div className="card">
                        <div className="card-body py-5">
                            <h4 className="font-weight-bold h3 mb-4 text-center">
                                {successmessage}
                            </h4>
                            <div className="text-center">
                                <button onClick={() => reset()} className="btn font-weight-bold shadow btn-primary">
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
                {(!isEdit) &&
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                        <BreadcrumbItem active>Nueva publicación</BreadcrumbItem>
                    </Breadcrumb>
                }
                {(!isEdit) &&
                    <h1 className="h4 mb-3 font-weight-bold">
                        Nueva publicación
                    </h1>
                }
                <div>
                    <InlineSpinner />
                </div>
            </div>
        )
    }
}

export default BidsSellerAd
