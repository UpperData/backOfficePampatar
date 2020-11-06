import React, {useState, useEffect, useRef, Fragment} from 'react'
import {useSelector} from 'react-redux'
import MultipleSelect from '../selects/MultipleSelect';

function PhoneMultiple(props) {

    const [search,         setsearch]               = useState(true);
    const [loading,        setloading]              = useState(true);

    const [phonesNumber,   setPhonesNumber]     = useState([]);
    const [count,          setcount]            = useState(0);
    const listPhoneTypes = useSelector(state => state.backoffice.phoneTypes.rows);

    const addPhoneNumber = () => {
        let listOfPhonesNumber = phonesNumber;
        listOfPhonesNumber.push({id: ( phonesNumber.length + 1), number: '', phoneType: null });
        //console.log(listOfPhonesNumber);
        setPhonesNumber(listOfPhonesNumber);
        setcount(count + 1);
    }

    const typeNumberChange = (option, id) => {
        let listOfPhonesNumber = phonesNumber;
        listOfPhonesNumber[id - 1].phoneType = option;

        //console.log(listOfPhonesNumber[id - 1]);
        //console.log(option);
        //console.log(id);

        setPhonesNumber(listOfPhonesNumber);
        setcount(count + 1);
    }

    const phoneNumberChange = (data, id) => {
        //console.log(data);
        let listOfPhonesNumber = phonesNumber;
        listOfPhonesNumber[id - 1].number = data;

        setPhonesNumber(listOfPhonesNumber);
        setcount(count + 1);
    }

    const deletePhone = (phoneNumber) => {
        //alert(phoneNumber);
        let newPhonesList = phonesNumber;
        newPhonesList.splice(phoneNumber - 1, 1);
        let newPhonesListFormatted = [];

        for (let i = 0; i < newPhonesList.length; i++) {
            let format = newPhonesList[i];
            format.id = i + 1
            newPhonesListFormatted.push(format);
        }

        //console.log(newPhonesListFormatted);
        // setPhonesNumberErrors([]);

        setPhonesNumber(newPhonesListFormatted);
        setcount(count + 3);
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                if(props.loadValue){
                    setPhonesNumber(props.loadValue);
                    props.onChange(props.loadValue);
                    setloading(false);
                }else{
                    setloading(false);
                }
            }
        }else{
            if(phonesNumber !== props.value){
                props.onChange(phonesNumber);
            }
        }
    }, []);

    let phoneIterator = 1;
    
    return (
        <div>
            {phonesNumber.length > 0 &&
                <Fragment>
                    {phonesNumber.map((item, key) => {

                        //let errors = phonesNumberErrors;
                        let errors = [];
                        let phoneKey = phoneIterator;

                        phoneIterator++;

                        let isActive = phonesNumber.filter(data => data.id === item.id);
                        let activeInput = isActive.length > 0;
                        let thisErrors  = {};

                        
                        let isError = errors.filter(data => data.id === item.id);
                        let activeError = isError.length > 0;
                        //console.log(isError);
                        

                        return (
                            <div key={key} className="form-group">
                                <label className="text-info h7 font-weight-bold my-2" htmlFor="">
                                    Número de teléfono #{phoneKey}
                                </label>
                                <div className="">
                                    <div className="row">
                                        <div className="col-md-8 my-1">
                                            <MultipleSelect placeholder="Tipo de teléfono" value={(activeInput) ? isActive[0].phoneType : null}  change={(option) => typeNumberChange(option, item.id)} data={listPhoneTypes} />
                                            {activeError && isError[0].validateType === false &&
                                                <small className="my-2 text-danger font-weight-bold">Verifique el tipo de teléfono</small>
                                            }
                                        </div>
                                        <div className="col-md-4 my-1">
                                        </div>
                                        <div className="col-md-8 my-1">
                                            <input type="text" value={(activeInput) ? isActive[0].number : '' } onChange={(e) => phoneNumberChange(e.target.value, item.id)} 
                                            className={"form-control" + ((activeError && isError[0].validateNumber === false) ? ' is-invalid' : '')} placeholder="Número de teléfono" />
                                            {activeError && isError[0].validateNumber === false &&
                                                <small className="my-2 text-danger font-weight-bold">Verifique el número de teléfono</small>
                                            }
                                        </div>
                                        <div className="col-md-4 my-1">
                                            <button type="button" onClick={() => deletePhone(item.id)} className="btn btn-primary">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Fragment>
            }

            {phonesNumber.length <= 2 &&
                <button type="button" onClick={() => addPhoneNumber()} className="btn btn-block rounded shadow font-weight-bold btn-primary">
                    <i className="fa fa-plus mr-2"></i>Añadir número de teléfono
                </button>
            }
        </div>
    )
}

export default PhoneMultiple
