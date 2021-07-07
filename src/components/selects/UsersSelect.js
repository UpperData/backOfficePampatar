import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function UsersSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);

    let url = '/GEt/AcTIvE/accOUNtS/roLe/'+props.roleId;

    useEffect(() => {
        if(loading){
            if(search){
                const getData = () => {
                    axios.get(url).then((res) => {
                        console.log(res.data);

                        let users = res.data.rows;
                        let newList = [];
            
                        for(var i=0; i < users.length; i++){
                            
                            let thisElement = users[i];
            
                            let formattedElement = {};
                            formattedElement.label = thisElement.Account.email;
                            formattedElement.value = thisElement.Account.id;
            
                            newList.push(formattedElement);
                        }   
                        
                        newList.sort(function (a, b) {
                            return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
                        });
            
                        setList(newList);
                        setLoading(false);
                    });
                }

                setsearch(false);
                getData();
            }
        }
    }, [url, loading, search]);

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
                placeholder="Cargando usuarios"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Seleccione un usuario" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default UsersSelect
