import React, {useState, useEffect, Fragment} from 'react'
import "react-datetime/css/react-datetime.css";
import DaysSelect from '../selects/DaysSelect';

import Datetime from 'react-datetime';

//lang
require("moment/locale/es");

function TimePanel(props) {

    const [search,          setsearch]     = useState(true);
    const [loading,         setloading]    = useState(true);
    //const [daysSelected,    setdaysSelected]      = useState([]);
    const [times,           settimes]      = useState([]);
    const [count,           setcount]      = useState(0);

    //let daysSelected = [];

    const addTime = () => {
        let list = times;
        list.push({
            id: ( list.length + 1),
            day: null,
            hours:{
                start:  null,
                end:    null
            }
        });

        settimes(list);
        setcount(count + 1);
        //console.log(list);
    }

    const changehh = (id, type, date) => {
        let list = times;
        list[id - 1].hours[type] = date;

        //console.log(list[id - 1]);

        settimes(list);
        setcount(count + 1);
    }

    const changeday = (id, data) => {
        let list = times;
        list[id - 1].day = data;

        //let changeDaysSelected = daysSelected;
        //daysSelected.push(data.value);
        
        //setdaysSelected(changeDaysSelected);
        settimes(list);
        setcount(count + 3);

        console.log(list);
        //console.log(changeDaysSelected);
    }

    //time

    /*
    const [phonesNumber,   setPhonesNumber]     = useState([]);

    const listPhoneTypes = useSelector(state => state.backoffice.phoneTypes.rows);
    const addPhoneNumber = () => {
        let listOfPhonesNumber = phonesNumber;
        listOfPhonesNumber.push({id: ( phonesNumber.length + 1), number: '', phoneType: null });
        console.log(listOfPhonesNumber);
        setPhonesNumber(listOfPhonesNumber);
        setcount(count + 1);
    }
    */

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                if(props.loadValue){
                    //setPhonesNumber(props.loadValue);
                    props.onChange(props.loadValue);
                    setloading(false);
                }else{
                    setloading(false);
                }
            }
        }else{
            console.log(props.value);

            if((times.length === 0 || times === null) && Array.isArray(props.value)){
                settimes(props.value);
            }else if(times !== props.value){
                console.log(props.value);
                props.onChange(times);
            }
        }
    }, [loading, search, props, times]);

    let it = 1;
    
    return (
        <div>
            {times.length > 0 &&
                <Fragment>
                    {times.map((item, key) => {

                        //let errors = phonesNumberErrors;
                        //let errors = [];

                        it = it+1;

                        let isActive = times.filter(data => data.id === item.id);
                        let activeInput = isActive.length > 0;
                        //let thisErrors  = {};

                        //let isError = errors.filter(data => data.id === item.id);
                        //let activeError = isError.length > 0;
                        //console.log(isError);
                        

                        return (
                            <div key={it+key}>
                                <div>
                                    <div className="horario">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Día:</label>
                                                    <DaysSelect timesSelected={times} value={(activeInput) ? isActive[0].day : '' } onChange={(data) => changeday(item.id, data)} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Hora de inicio:</label>
                                                    <Datetime
                                                        locale="es"
                                                        dateFormat={false}
                                                        inputProps={{ placeholder: "Seleccione una hora" }}
                                                        value={(activeInput) ? isActive[0].hours.start : '' }
                                                        onChange={(date) => changehh(item.id,'start', date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Hora de culminación:</label>
                                                    <Datetime
                                                        locale="es"
                                                        dateFormat={false}
                                                        inputProps={{ placeholder: "Seleccione una hora" }}
                                                        value={(activeInput) ? isActive[0].hours.end : '' }
                                                        onChange={(date) => changehh(item.id,'end', date)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Fragment>
            }

            {times.length < 7 &&
                <button type="button" onClick={() => addTime()} className="btn mb-2 btn-block rounded shadow font-weight-bold btn-primary">
                    <i className="fa fa-plus mr-2"></i>Añadir día al horario
                </button>
            }
        </div>
    )
}

export default TimePanel
