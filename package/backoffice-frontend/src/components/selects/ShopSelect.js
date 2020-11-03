import React, {useState, useEffect} from 'react'
import Select from 'react-select'

function ShopSelect(props) {
    
    console.log(props);
    let values = props.list;
    let allValues = [];
    
    if(values.length > 0){
        for (let i = 0; i < values.length; i++) {
            const element = values[i];

            let thisValue = {};
            thisValue.label = element.marca+' - '+element.Account.Person.firstName+' '+element.Account.Person.lastName;
            thisValue.value = element.id;

            allValues.push(thisValue);
        }
    }

    const [list, setList] = useState(allValues);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(true);

    const handleSelect = async (selectedOption) => {
        props.onChange(selectedOption); 
    };

    //console.log(list);
    //console.log(props.value);

    let searchData = (props.value !== null) ? list.filter(option => option.value === props.value.value)[0] : null;

    if(loading){
        return (
            <Select 
                placeholder="Cargando..."  
                onChange={handleSelect} 
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                placeholder="Seleccione una tienda" 
                isSearchable
                value={(list.length > 0 && props.value && searchData !== null) ? searchData  : null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default ShopSelect;
