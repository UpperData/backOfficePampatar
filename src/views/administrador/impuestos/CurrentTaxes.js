import React, {useState, useEffect} from 'react'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from "reactstrap"
import Select from 'react-select'
import TaxesTypesSelect from '../../../components/selects/taxesTypesSelect';

function CurrentTaxes() {

    let urlTypeTaxes       = '/generAls/Get/TAXType/';
    let urlGetCurrentTaxes = '/setting/taxes/admin/tax/get/currents/';

    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);
    const [data, setdata]       = useState(null);

    const [types, settypes]     = useState(null);
    const [typeSelected, settypeSelected] = useState(null);

    useEffect(() => {
        if(loading){
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
                    
                    /*
                        axios.get(urlTypeTaxes).then((res) => {
                            console.log(res.data);
                            
                            settypes(res.data);
                            setloading(false);

                                axios.get(urlGetCurrentTaxes).then((res) => {
                                    console.log(res.data);
                                    setdata(res.data);
                                    setloading(false);
                                }).catch((err) => {
                                    console.error(err);
                                });

                        }).catch((err) => {
                            console.error(err);
                        });
                    */
                }
            }

            getData();
        }
    }, [urlGetCurrentTaxes, loading, search]);


    const searchTaxes  = (value) => {
        settypeSelected(value);
        let url = `/geneRals/GetTAx/byTyPE/${value.value}`;

        axios.get(url).then((res) => {
            console.log(res.data);
            setdata(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    if(!loading){
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Impuestos</a></BreadcrumbItem>
                    <BreadcrumbItem active>Impuestos actuales</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    Impuestos Actuales
                </h1>

                {(2 === 3) &&
                    <div className="card">
                        <div className="card-header bg-white">
                            <h6 className="mb-0">Seleccionar tipo de impuesto</h6>
                        </div>
                        <div className="card-body border-top">
                            <TaxesTypesSelect onChange={(value) => searchTaxes(value)} value={typeSelected} />
                        </div>
                    </div>
                }

                {(data !== null && data.length > 0) && 
                    <div className="taxes-list">
                        <div className="row">
                            {data.map((item, key) => {
                                return (
                                    <div key={key} className="col col-lg-6 mb-4">
                                        <Link to={"/tax/show/"+item.id} className="card shadow h-100">
                                            <div className="card-body h-100 py-4">
                                                <div className="row h-100 justify-content-center align-items-center">
                                                    <div className="col-12">
                                                        <h2 className="text-center text-secondary">
                                                            <strong>
                                                                {item.name}
                                                            </strong>
                                                        </h2>
                                                        {item.hasOwnProperty('taxValues') && item.taxValues.length > 0 &&
                                                            <div className="text-center">
                                                                <h4 className="text-primary mb-0 font-weight-normal">
                                                                    <span className="font-weight-bold">{item.taxValues[item.taxValues.length - 1].value}{item.name === 'IVA' ? ' %': ''}</span>
                                                                </h4>
                                                                <small className="text-muted">
                                                                    Creado el día: <span className="font-weight-bold">{item.taxValues[item.taxValues.length - 1].createdAt.split('T')[0]}</span>
                                                                </small>
                                                            </div>
                                                        }
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
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Impuestos</a></BreadcrumbItem>
                    <BreadcrumbItem active>Impuestos actuales</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    Impuestos Actuales
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default CurrentTaxes
