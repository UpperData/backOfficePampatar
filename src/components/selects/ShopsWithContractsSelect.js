import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function ShopWithContractsSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);

    useEffect(() => {
        if(loading){
            if(search){
                let url = '/setting/seller/shop/all';

                const getData = () => {
                    return axios.get(url).then((res) => {
                        console.log(res.data);
                        let items = res.data.data.rsShopAll;
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

                setsearch(false);
                getData();
            }
        }
    }, [loading, search]);

    const handleSelect = async (selectedOption) => {
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando lista de tiendas"  
                options={[]} 
            />
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
                placeholder="Lista de tiendas" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default ShopWithContractsSelect
