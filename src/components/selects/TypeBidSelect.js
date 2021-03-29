import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function BidTypesSelect(props) {

    const backoffice = useSelector(state => state.backoffice);
    let types = [];
    //console.log(backoffice.bidTypes);

    if(backoffice.bidTypes !== null) {
        types = backoffice.bidTypes;
    }

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const formatData = () => {
        let newList = [];

        for(var i=0; i < types.length; i++){
            
            let thisElement = types[i];

            let formattedElement = {};
            formattedElement.label = thisElement.name;
            formattedElement.value = thisElement.id;

            newList.push(formattedElement);
        }            

        setList(newList);
        setLoading(false);
    }

    useEffect(() => {
        if(loading){
            if(backoffice.banks !== null) {
                formatData();
            }
        }
    });

    const handleSelect = async (selectedOption) => {
        //console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        //console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando.."  
                options={[]} 
            />
        )
    }else{
        if(props.icons){
            return (
                <div>
                    <ul className="list-style-none pt-3 bid-type-list justify-content-center align-items-center flex-wrap d-flex p-0 m-0">
                        {(list.map((item, key) => {
                            let icon = "";

                            if(item.value === 1){
                                icon = "fa fa-hand-holding-heart";
                            }else if(item.value === 2){
                                icon = "fa fa-boxes";
                            }else if(item.value === 3){
                                icon = "fa fa-paper-plane";
                            }

                            return (
                                <li key={key} className="inline-flex justify-content-center px-4">
                                    <button onClick={() => props.onChange(item)} className="d-flex mx-auto">
                                        <i className={`${icon}`}></i>
                                    </button>
                                    <h5 className="pt-4 text-center h6 font-weight-bold">
                                        {item.label}
                                    </h5>
                                </li>
                            )
                        }))}
                    </ul>
                </div>
            )
        }else{
            let elementSelected = null;

            if(props.value !== undefined && props.value !== null && list.length > 0){
                let findElement = list.find(item => item.value === props.value.value);
                elementSelected = findElement;
            }

            return (
                <Select 
                    isSearchable={true}
                    placeholder="Tipo de publicacion" 
                    value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null} 
                    onChange={handleSelect} 
                    options={list} 
                />
            )
        }
    }
}

export default BidTypesSelect
