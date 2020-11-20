import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function WarehouseSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);
    let url = '/myWarehouse';

    const getData = () => {
        axios.get(url).then((res) => {
            let warehouses = res.data.data.values;
            let newList = [];

            for(var i=0; i < warehouses.length; i++){
                
                let thisElement = warehouses[i];

                let formattedElement = {};
                formattedElement.label = thisElement.name;
                formattedElement.value = thisElement.id;

                if(formattedElement.label !== 'Pampatar'){
                    newList.push(formattedElement);
                }
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
                placeholder="Cargando lista de almacenes"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Almacen" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default WarehouseSelect
