import React, {useState, useEffect} from 'react'
import Select from 'react-select'

function MultipleSelect(props) {
    const [list,        setList]        = useState([]);
    const [loading,     setloading]     = useState(true);
    const data                          = props.data ? props.data : [];

    useEffect(() => {
        if(loading){

            let newList = [];

            for(var i = 0; i < data.length; i++){
                
                let thisItem = data[i];

                let newItem = {};
                newItem.label = thisItem.name;
                newItem.value = thisItem.id;

                newList.push(newItem);
            }            

            //console.log(newList);
            setList(newList);
            setloading(false);
        }
    });

    const handleSelect = async (selectedOption) => {
        //console.log(selectedOption);
        props.change(selectedOption);
    };

    //let searchData = interestList.filter(option => option.value === props.value[0].value);

    if(loading){
        return (
            <div>
                <Select 
                    isSearchable={true}
                    placeholder="Cargando.."  
                    onChange={handleSelect} 
                    options={[]} 
                />
            </div>
        )
    }else{
        return (
            <div>
                <Select 
                    isSearchable={true}
                    value={(list.length > 0 && props.value) ? props.value : null}
                    placeholder={props.placeholder ? props.placeholder : ''} 
                    onChange={handleSelect} 
                    options={list} 
                    isMulti={props.isMulti ? props.isMulti : false}
                />
            </div>
        )
    }
}

export default MultipleSelect
