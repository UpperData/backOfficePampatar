import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function AddressTypesSelect(props) {

    const backoffice = useSelector(state => state.backoffice);
    const addressTypes = useSelector(state => state.backoffice.addressTypes.rows);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading){
            if(backoffice.addressTypes !== null){
                const formatData = () => {
                    let newList = [];
            
                    for(var i=0; i < addressTypes.length; i++){
                        
                        let thisElement = addressTypes[i];
            
                        let formattedElement = {};
                        formattedElement.label = thisElement.name;
                        formattedElement.value = thisElement.id;
            
                        newList.push(formattedElement);
                    }            
            
                    setList(newList);
                    setLoading(false);
                }

                formatData();
            }
        }
    }, [loading, backoffice.addressTypes, addressTypes]);

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
                placeholder="Cargando tipos"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Dirección" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default AddressTypesSelect
