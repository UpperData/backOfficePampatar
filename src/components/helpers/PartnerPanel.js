import React, {useState, useEffect, Fragment} from 'react'

function PartnerPanel(props) {

    //const [loading,        setloading]           = useState(true);
    //const [search,         setsearch]            = useState(true);
    const [partners,       setpartners]          = useState((props.value !== null && Array.isArray(props.value)) ? props.value : []);
    const [count,          setcount]             = useState(0);
    //const maxPartners = 10;

    const addPartner = () => {
        let list = partners;
        list.push({id: ( partners.length + 1), firstName: '', lastName: '', relationship: '' });
        setpartners(list);
        setcount(count + 1);
    }

    const deletePartner = (partnerId) => {
        let list = partners;
        list.splice(partnerId - 1, 1);
        let newList = [];

        for (let i = 0; i < list.length; i++) {
            let format = list[i];
            format.id = i + 1
            newList.push(format);
        }

        setpartners(newList);
        setcount(count + 3);
    }

    const partnerNameChange = (value, id) => {
        //console.log(data);
        let list = partners;
        list[id - 1].firstName = value;

        setpartners(list);
        setcount(count + 1);
    }

    const partnerLastNameChange = (value, id) => {
        //console.log(data);
        let list = partners;
        list[id - 1].lastName = value;

        setpartners(list);
        setcount(count + 1);
    }

    const partnerRelationshipChange = (value, id) => {
        //console.log(data);
        let list = partners;
        list[id - 1].relationship = value;

        setpartners(list);
        setcount(count + 1);
    }

    let iterator = 1;

    useEffect(() => {
        if(partners !== props.value){
            //console.log('cambiando data', document);
            props.onChange(partners);
        }
    });

    return (
        <div>
            {partners.length > 0 &&
                <Fragment>
                    {partners.map((item, key) => {

                        //let errors = [];
                        let partnerKey = iterator;
                        let thisPartner = partners.filter(data => data.id === item.id);
                        let exists = thisPartner.length > 0;

                        iterator++;

                        return <div key={key}>
                            <h5 className="text-muted">Datos del colaborador: #{partnerKey}</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input 
                                        value={(exists) ? thisPartner[0].firstName : '' }
                                        onChange={(e) => partnerNameChange(e.target.value, item.id)} 
                                        type="text" 
                                        placeholder="Nombre" 
                                        className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <input 
                                            value={(exists) ? thisPartner[0].lastName : '' }
                                            onChange={(e) => partnerLastNameChange(e.target.value, item.id)} 
                                            type="text" 
                                            placeholder="Apellido" 
                                            className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input 
                                        value={(exists) ? thisPartner[0].relationship : '' }
                                        onChange={(e) => partnerRelationshipChange(e.target.value, item.id)} 
                                        type="text" 
                                        placeholder="Relación" 
                                        className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-primary" onClick={() => deletePartner(partnerKey)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </Fragment>
            }

            {partners.length >= 0 &&
                <button type="button" onClick={() => addPartner()} className="btn btn-block rounded shadow font-weight-bold btn-primary">
                    <i className="fa fa-plus mr-2"></i>Añadir colaborador
                </button>
            }
        </div>
    )
}

export default PartnerPanel
