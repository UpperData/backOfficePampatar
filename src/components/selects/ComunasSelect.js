import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios';

function ComunasSelect(props) {

    let idProvinceByProps = props.idProvince ? props.idProvince : null;
    const [idByProps, setIdByProps] = useState(idProvinceByProps);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(true);
    
    let searchData = (list.length > 0 && props.value && list.filter(option => option.value === props.value.value)[0] !== null) ? list.filter(option => option.value === props.value.value)[0] : null;

    useEffect(() => {
        if(idProvinceByProps !== null && idProvinceByProps !== idByProps){
            setSearch(true);
            setLoading(true);
            setIdByProps(idProvinceByProps);
        }else if(idProvinceByProps === idByProps && idByProps !== null){
            console.log('Buscando comunas para la provincia:'+ idByProps);
            if(search){
                setSearch(false);
                const getList = () => {
                    let url = `/comuna/${idProvinceByProps}/`;
            
                    axios.get(url)
                    .then((res) => {
                        console.log('LISTA DE COMUNAS');
                        console.log(res.data);
            
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

                getList();
            }
        } 
    }, [idProvinceByProps, idByProps, search]);

    const handleSelect = async (selectedOption) => {
        console.log(selectedOption);
        //props.setCity({});
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Seleccione una provincia"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Seleccione una comuna" 
                value={searchData} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default ComunasSelect
