import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function PrincipalCategoriesSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);
    let url = '/menu/cat1';

    const getData = () => {
        axios.get(url).then((res) => {
            console.log(res.data);
            let items = res.data.data.menu;
            let newList = [];

            for(var i=0; i < items.length; i++){
                
                let thisElement = items[i];

                let formattedElement = {};
                formattedElement.label = thisElement.name;
                formattedElement.value = thisElement.id;

                newList.push(formattedElement);
            }            

            setList(newList);
            setLoading(false);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    }, []);

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
                placeholder="Cargando categorías"  
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
                placeholder="Categorías" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default PrincipalCategoriesSelect
