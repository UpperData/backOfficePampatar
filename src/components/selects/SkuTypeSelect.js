import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios';

function SkuTypeSelect(props) {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(true);

    const getList = () => {
        let url = `/sKU/types/get`;

        axios.get(url)
        .then((res) => {
            //console.log('Tipos de producto');
            //console.log(res.data);

            let newList = [];

            if(res.data){
                let data = res.data;
                for(var i=0; i < data.length; i++){
                    let thisElement = data[i];

                    let formattedElement = {};
                    formattedElement.label = thisElement.name;
                    formattedElement.value = thisElement.id;

                    newList.push(formattedElement);
                }            

                setList(newList);
                setLoading(false);
            }
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }
    
    let searchData = (list.length > 0 && props.value && list.filter(option => option.value === props.value.value)[0] !== null) ? list.filter(option => option.value === props.value.value)[0] : null;

    useEffect(() => {
        if(loading){
            if(search){
                setSearch(false);
                getList();
            }
        }
    }, [loading,search]);

    const handleSelect = async (selectedOption) => {
        console.log(selectedOption);
        //props.setCity({});
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando..."  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Seleccione el tipo de producto" 
                value={searchData} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default SkuTypeSelect
