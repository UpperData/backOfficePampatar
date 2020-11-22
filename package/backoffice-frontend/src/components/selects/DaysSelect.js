import React, {useState, useEffect} from 'react'
import Select from 'react-select'

function DaysSelect(props) {
    //const backoffice = useSelector(state => state.backoffice);
    let days = [
        {id:1,name:"Lunes"},
        {id:2,name:"Martes"},
        {id:3,name:"MIercoles"},
        {id:4,name:"Jueves"},
        {id:5,name:"Viernes"},
        {id:6,name:"Sabado"},
        {id:7,name:"Domingo"}
    ];

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

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
        console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando días"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Día" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default DaysSelect;
