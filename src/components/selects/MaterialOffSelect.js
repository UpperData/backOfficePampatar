import React, {useState, useEffect} from 'react'
import { Fragment } from 'react';
import Select from 'react-select'

function MaterialOffSelect(props) {
    //const backoffice = useSelector(state => state.backoffice);
    let days = [
        {id:1, name:"Materiallicor de cacao"},
        {id:2, name:"Azucar morena 30%"}
    ];

    //console.log(daysSelected);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setmessage] = useState('');

    const formatData = () => {
        
        let newList = [];
        for(var i=0; i < days.length; i++){
            
            let thisElement = days[i];
            
            let formattedElement = {};
            formattedElement.label = thisElement.name;
            formattedElement.value = thisElement.id;

            newList.push(formattedElement);
        }            
        

        setList(newList);
        setLoading(false);
    }

    useEffect(() => {
        if(loading){
            formatData();
        }
    });

    const handleSelect = async (selectedOption) => {
        setmessage('');
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Material"  
                options={[]} 
            />
        )
    }else{
        return (
            <Fragment>
                <Select 
                    isSearchable={true}
                    placeholder="Material" 
                    value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                    onChange={handleSelect} 
                    options={list} 
                />
                <div className="text-primary">
                    <small>
                        {message}
                    </small>
                </div>
            </Fragment>
        )
    }
}

export default MaterialOffSelect;
