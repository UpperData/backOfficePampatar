import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'
import {
    CustomInput,
} from 'reactstrap';

function UserIndentityDocument(props) {

    const [loading,  setloading]                                = useState(true);
    const [search,   setsearch]                                 = useState(true);
    const [document, setdocument]                               = useState((props.value !== null && Array.isArray(props.value)) ? props.value : []);
    const [listDocumentTypes,     setListDocumentTypes]         = useState([]);
    const [searchDocumentTypes,   setSearchDocumentTypes]       = useState(false);
    const [personTypeId,          setPersonTypeId]              = useState((props.personType !== null && props.personType !== undefined && (Number(props.personType) >= 0)) ? props.personType : null);
    const [count,    setcount]                                  = useState(0);

    const backoffice = useSelector(state => state.backoffice);
    let peopleTypeList = backoffice.peopleTypes.rows;

    const handleCheckInDocumentTypes = (dataObject) => {
        console.log('Check in tipo de documento');
        let dataInArray = document;
        let value = dataInArray.find(data => data.docType.id === dataObject.docType.id);

        if(!value){
            dataInArray.push(dataObject);
            setdocument(dataInArray);
            console.log('Elementos:', dataInArray);
        }else{
            let dataInArrayWithoutElement = dataInArray.filter(data => data.docType.id !== dataObject.docType.id);
            setdocument(dataInArrayWithoutElement);
            console.log('Elementos:', dataInArrayWithoutElement);
        }

        setcount(count + 2);
    }

    const changePersonType = (id) => {
        setPersonTypeId(id);

        let docsByNaturalUrl = '/docByPeopleType/'+id;
        setSearchDocumentTypes(true);

        axios.get(docsByNaturalUrl).then((res) => {
            console.log('person type:'+id);
            setdocument([]);
            setListDocumentTypes(res.data.data.rows);
            setSearchDocumentTypes(false);
        });
    }

    const handleDocumentTypeInputChange = (e, id) => {
        let {value} = e.target;
        let documentList = document;
        let newDocumentList = [];

        for (let i = 0; i < documentList.length; i++) {
            const thisDocument = documentList[i];
            if(thisDocument.docType.id === id){
                thisDocument.docNumber = value;
            }

            newDocumentList.push(thisDocument);
        }

        console.log(documentList);
        console.log(newDocumentList);

        setdocument(newDocumentList);
        setcount(count + 2);
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                if(personTypeId !== null){
                    const changePersonTypeInLoad = (id) => {
                        setPersonTypeId(id);
                
                        let docsByNaturalUrl = '/docByPeopleType/'+id;
                        setSearchDocumentTypes(true);
                
                        axios.get(docsByNaturalUrl).then((res) => {
                            console.log('person type:'+id);
                            console.log(document);
                            setListDocumentTypes(res.data.data.rows);
                            setSearchDocumentTypes(false);
                        });
                    }

                    changePersonTypeInLoad(personTypeId);
                }
                setloading(false);
            }
        }else{
            if(document !== props.value){
                console.log('cambiando data', document);
                props.onChange(document);
            }
        }
    },[loading, search, personTypeId, document, props]);

    let userDocumentIderntity = listDocumentTypes;

    return (
        <div className="">
            <div className="form-group">
                <label className="d-block mb-0" htmlFor="documentType">Tipo de persona</label>
                <div className="radios py-2">
                    {peopleTypeList.length > 0 && peopleTypeList.map((item, key) => {
                        return (
                            <CustomInput className="d-inline-flex mr-3" key={key} checked={(personTypeId === item.id)} onChange={() => changePersonType(item.id)}  type="radio" id={`person-type-${item.id}`} name={`person-type`} label={item.name} />
                        )
                    })}
                </div>
            </div>
            <div className="form-group">
                <label className="d-block mb-0" htmlFor="documentType">Tipo de documento</label>
                {userDocumentIderntity.length === 0 && !searchDocumentTypes &&
                    <small>Debe seleccionar primero un tipo de persona</small>
                }
                {userDocumentIderntity.length > 0 && !searchDocumentTypes &&
                    <small>Seleccione un tipo de documento de identificación</small>
                }
                {(searchDocumentTypes) &&
                    <p className="py-3">
                        <i className="fa fa-spin fa-spinner mr-3"></i>Cargando
                    </p>
                }
                <div className="cheboxex pt-2">
                    {userDocumentIderntity.length > 0 && searchDocumentTypes === false && userDocumentIderntity.map((item, key) => {
                        let isActive = document.filter(data => data.docType.id === item.id);
                        let activeInput = isActive.length > 0;
                        //console.log(isActive[0]);
                        //console.log(document);
                        let sendObject = {docType: {id: item.id, name: item.name}, docNumber: ''};

                        return (
                            <div key={key} className="row align-items-center">
                                <div className="col-md-4 my-2">
                                    <CustomInput 
                                        onChange={() => handleCheckInDocumentTypes(sendObject)}
                                        checked={activeInput}
                                        type="checkbox" 
                                        id={`document-type-${item.id}`} 
                                        name={`document-type`} 
                                        label={item.name} 
                                    />
                                </div>
                                <div className="col-md-8 my-2">
                                    <input disabled={!activeInput} value={(activeInput) ? isActive[0].docNumber : '' } onChange={(e) => handleDocumentTypeInputChange(e, item.id)} type="text" placeholder="Número del documento" className=" form-control"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
                                            
    )
}

export default UserIndentityDocument
