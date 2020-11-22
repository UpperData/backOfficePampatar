import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function GenderSelect(props) {

    const backoffice = useSelector(state => state.backoffice);
    let genders = [];
    if(backoffice.genders !== null){
        genders = backoffice.genders.rows;
    }
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatData = () => {
        let newList = [];
            for(var i=0; i < genders.length; i++){
                
                let thisElement = genders[i];

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
            if(backoffice.genders !== null){
                formatData();
            }
        }
    }, []);

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
                placeholder="Cargando géneros"  
                options={[]} 
            />
        )
    }else{
        let elementSelected = null;

        if(props.value !== undefined && props.value !== null && list.length > 0){
            let findElement = list.find(item => item.value === props.value.value);
            elementSelected = findElement;
            //console.log(findElement);
            //console.log(props.value);
        }

        return (
            <Select 
                isSearchable={true}
                placeholder="Género" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default GenderSelect
