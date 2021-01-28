import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function LotStatusSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);

    useEffect(() => {
        if(loading){
            if(search){
                let url = '/status/gEt/valUeS/STusALL/';

                const getData = () => {
                    axios.get(url).then((res) => {
                        console.log();
                        let data = res.data;
                        //console.log(data);
                        let newList = [];

                        for(var i=0; i < data.length; i++){
                            
                            let thisElement = data[i];

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
        console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando lista de estatus"  
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
                placeholder="Estatus" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default LotStatusSelect
