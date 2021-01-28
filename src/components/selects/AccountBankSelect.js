import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios';

function AccountBankSelect(props) {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(true);
    
    //let searchData = (list.length > 0 && props.value && list.filter(option => option.value === props.value.value)[0] !== null) ? list.filter(option => option.value === props.value.value)[0] : null;

    useEffect(() => {
        if(loading){
            if(search){
                const getList = () => {
                    let url = `/getTypeBankAccount`;
            
                    axios.get(url)
                    .then((res) => {
                        console.log('LISTA DE TIPO DE CUENTA BANCARIA');
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

                setSearch(false);
                getList();
            }
        } 
    }, [loading, search]);

    const handleSelect = async (selectedOption) => {
        console.log(selectedOption);
        //props.setCity({});
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Tipo de cuenta"  
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
                placeholder="Tipo de cuenta" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default AccountBankSelect
