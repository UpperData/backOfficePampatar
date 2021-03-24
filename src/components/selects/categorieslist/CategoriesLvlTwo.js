import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function CategoriesLvlTwo(props) {

    let listcat = [];
    const [categoryParent, setcategoryParent] = useState(props.categoryParent !== undefined ? props.categoryParent : 0);
    if(props.list !== null && props.list !== undefined) {
        listcat = props.list;
    }

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const formatData = () => {
        
        let newList = [];
        console.log(props.list);
        let items = props.list.find(item => item.id === props.categoryParent);
        items = items.cat2s;

        for(var i=0; i < items.length; i++){
            
            let thisElement = items[i];

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
            if(props.list !== null && props.list !== undefined) {
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
                placeholder="Cargando categorias"  
                options={[]} 
            />
        )
    }else{
        let elementSelected = null;

        /*
        if(props.value !== undefined && props.value !== null && list.length > 0){
            let findElement = list.find(item => item.value === props.value.value);
            elementSelected = findElement;
            //console.log(findElement);
            //console.log(props.value);
        }
        */

        return (
            <Select 
                isSearchable={true}
                isMulti
                placeholder="Categorias de segundo nivel" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? props.value : null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default CategoriesLvlTwo
