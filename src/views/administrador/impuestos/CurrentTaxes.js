import React, {useState, useEffect} from 'react'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from 'react-router-dom'

function CurrentTaxes() {

    let urlGetCurrentTaxes = '/setting/taxes/admin/tax/get/currents/';

    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);
    const [data, setdata]       = useState(null);

    const getData = () => {
        if(search){
            setsearch(false);

            axios.get(urlGetCurrentTaxes).then((res) => {
                console.log(res.data);
                setdata(res.data);
                setloading(false);
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    useEffect(() => {
        if(loading){
            getData();
        }
    }, []);

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    Impuestos Actuales
                </h1>
                {(data!==null && data.length > 0) && 
                    <div className="taxes-list">
                        <div className="row">
                            {data.map((item, key) => {
                                return (
                                    <div key={key} className="col col-lg-6">
                                        <Link to={"/tax/show/"+item.id} className="card shadow h-100">
                                            <div className="card-body h-100 py-4">
                                                <div className="row h-100 justify-content-center align-items-center">
                                                    <div className="col-12">
                                                        <h2 className="text-center text-secondary">
                                                            <strong>
                                                                {item.name}
                                                            </strong>
                                                        </h2>
                                                        {item.taxValues.length > 0 && item.taxValues.map((subitem, index) => {
                                                            return (
                                                                <div className="text-center">
                                                                    <h4 key={index} className="text-primary mb-0 font-weight-normal">
                                                                        <span className="font-weight-bold">{subitem.value}{item.name === 'IVA' ? ' %': ''}</span>
                                                                    </h4>
                                                                    <small className="text-muted">
                                                                        Creado el día: <span className="font-weight-bold">{subitem.createdAt.split('T')[0]}</span>
                                                                    </small>
                                                                </div>
                                                                
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    Impuestos Actuales
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default CurrentTaxes
