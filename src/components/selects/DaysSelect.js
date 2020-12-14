import React, {useState, useEffect} from 'react'
import { Fragment } from 'react';
import Select from 'react-select'

function DaysSelect(props) {
    //const backoffice = useSelector(state => state.backoffice);
    let days = [
        {id:1,name:"Lunes"},
        {id:2,name:"Martes"},
        {id:3,name:"Miercoles"},
        {id:4,name:"Jueves"},
        {id:5,name:"Viernes"},
        {id:6,name:"Sabado"},
        {id:7,name:"Domingo"}
    ];

    let daysSelected = [];

    if(props.timesSelected.length > 0){
        for (let i = 0; i < props.timesSelected.length; i++) {
            if(props.timesSelected[i].day !== null){
                const element = props.timesSelected[i].day.value;
                daysSelected.push(element);
            }
        }
    }

    console.log(daysSelected);

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

            //console.log(formattedElement.value);
            //console.log(props.value);
            //console.log(props.timesSelected);
            let searchDay = daysSelected.find(day => day === thisElement.id);
            console.log(searchDay);
            if(searchDay !== undefined){

            }else{
                newList.push(formattedElement);
            }
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
        let searchDay = daysSelected.find(day => day === selectedOption.value);
        setmessage('');

        if(searchDay === undefined){
            console.log(selectedOption);
            //props.setRegion({});
            //props.setCity({});
            console.log(selectedOption);
            props.onChange(selectedOption); 
        }else{
            setmessage('Seleccione otro día');
        }
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
            <Fragment>
                <Select 
                    isSearchable={true}
                    placeholder="Día" 
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

export default DaysSelect;
