import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function NationalitySelect(props) {

    const nationalities = useSelector(state => state.backoffice.nationalities.rows);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading){

            let newList = [];

            for(var i=0; i < nationalities.length; i++){
                
                let thisElement = nationalities[i];

                let formattedElement = {};
                formattedElement.label = thisElement.name;
                formattedElement.value = thisElement.id;

                newList.push(formattedElement);
            }            

            setList(newList);
            setLoading(false);
        }
    });

    const handleSelect = async (selectedOption) => {
        //console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando nacionalidades"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Nacionalidad" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default NationalitySelect
