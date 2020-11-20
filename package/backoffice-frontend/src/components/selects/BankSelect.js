import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function BankSelect(props) {

    const backoffice = useSelector(state => state.backoffice);
    let banks = [];
    if(backoffice.banks !== null) {
        banks = backoffice.banks.rows;
    }
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const formatData = () => {
        let newList = [];

        for(var i=0; i < banks.length; i++){
            
            let thisElement = banks[i];

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
                placeholder="Cargando lista de bancos"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Banco" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default BankSelect
