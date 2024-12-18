import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function SizesSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);
    let url = '/getSize/all/generals/';

    const getData = () => {
        axios.get(url).then((res) => {
            console.log(res.data);
            let product = res.data.data.rows;
            let newList = [];

            for(var i=0; i < product.length; i++){
                
                let thisElement = product[i];

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
                placeholder="Cargando"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Tamaño" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default SizesSelect
