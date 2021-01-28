import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios';

function ProvincesSelect(props) {

    let idRegionByProps = props.idRegion ? props.idRegion : null;
    const [idByProps, setIdByProps] = useState(idRegionByProps);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(true);
    
    let searchData = (list.length > 0 && props.value && list.filter(option => option.value === props.value.value)[0] !== null) ? list.filter(option => option.value === props.value.value)[0] : null;

    useEffect(() => {
        if(idRegionByProps !== null && idRegionByProps !== idByProps){
            setSearch(true);
            setLoading(true);
            setIdByProps(idRegionByProps);
        }else if(idRegionByProps === idByProps && idByProps !== null){
            console.log('Buscando provincias para la region:'+ idByProps);
            const getList = () => {
                let url = `/provinces/${idRegionByProps}/`;
        
                axios.get(url)
                .then((res) => {
                    //console.log('LISTA DE PROVINCIAS');
                    //console.log(res.data);
        
                    let newList = [];
        
                    if(res.data.data.result){
                        let data = res.data.data.rows;
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

            if(search){
                setSearch(false);
                getList();
            }
        } 
    }, [idRegionByProps, idByProps, search]);

    const handleSelect = async (selectedOption) => {
        //console.log(selectedOption);
        //props.setCity({});
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Seleccione una región"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Provincia" 
                value={searchData} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default ProvincesSelect
