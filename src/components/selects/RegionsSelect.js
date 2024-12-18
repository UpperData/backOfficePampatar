import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function RegionsSelect(props) {

    const backoffice = useSelector(state => state.backoffice);
    const regions = useSelector(state => state.backoffice.regions.rows);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading){
            if(backoffice.regions !== null){
                const formatData = () => {
                    let newList = [];
            
                    for(var i=0; i < regions.length; i++){
                        
                        let thisElement = regions[i];
            
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
    }, [loading, backoffice.regions, regions]);

    const handleSelect = async (selectedOption) => {
        console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando lista de regiones"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Región" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default RegionsSelect
