import React, {useState} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';
import axios from 'axios'
import TaxesSelect from '../../../components/selects/TaxesSelect';
import InlineSpinner from '../../spinner/InlineSpinner';

function UpdateTax() {
    let url = '/setting/taxes/admin/tax/update/';
    let urlget = '/taxes/admin/tax/get/oNE/';

    //const [loading,     setloading]             = useState(true);
    const [search,      setsearch]              = useState(false);
    const [sending,     setsending]             = useState(false);
    const [data,        setdata]                = useState(null);

    const [tax, settax]                         = useState(null);
    const [taxvalue, settaxvalue]               = useState('');

    const [errormessage,    seterrormessage]    = useState('');
    const [successmessage,  setsuccessmessage]  = useState('');

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const changeTax = (data) => {
        console.log(data);
        setsearch(true);
        settax(data);

        axios(urlget+data.value)
        .then((res) => {
            console.log(res.data);
            setdata(res.data);
            setsearch(false);
        }).catch((err) => {
            console.error(err);
            setsearch(false);
        });
    }
    
    const GoUpdateTax = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        setsending(true);
        let data = {
            taxId:tax.value,
	        value:taxvalue
        }

        axios({
            method: 'put',
            url: url,
            data
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                window.scrollTo({top: 10, behavior: 'smooth'});
                setsuccessmessage(res.data.data.message);
                settax(null);
                setdata(null);
                settaxvalue('');
                setModal(false);
            }else{
                window.scrollTo({top: 10, behavior: 'smooth'});
                seterrormessage(res.data.data.message);
            }
            setsending(false);
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    return (
        <div>
            <Breadcrumb listClassName="px-0">
                <BreadcrumbItem><a href="##">Impuestos</a></BreadcrumbItem>
                <BreadcrumbItem active>Actualizar impuesto</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="h4 mb-3 font-weight-bold">
                Actualizar impuesto
            </h1>
            {(errormessage !== '') &&
                <div className="alert alert-warning">
                    {errormessage}
                </div>
            }
            {(successmessage !== '') &&
                <div className="alert alert-success">
                    {successmessage}
                </div>
            }

            <Row>
                <Col md="12">
                    <Card>
                        <div className="p-3">
                            <CardTitle>
                                Seleccione un impuesto
                            </CardTitle>
                        </div>
                        <CardBody className="border-top">
                            <TaxesSelect value={tax} onChange={changeTax} 
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {(search) &&
                <div className="py-2">
                    <InlineSpinner />
                </div>
            }

            {(tax !== null && data !== null && !search) &&
                <form onSubmit={(e) => GoUpdateTax(e)} action="">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    Datos <span className="text-muted">({(data !== null) ? 'Actualizado por última vez el '+data.taxValues[0].createdAt.split('T')[0] : ''})</span>
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Valor del impuesto</label>
                                            <input 
                                                type="text" 
                                                value={data.taxValues[0].value}
                                                placeholder="Precio"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                         <div className="form-group">
                                            <label htmlFor="">Nuevo valor</label>
                                            <div>
                                                <input 
                                                    type="number" 
                                                    value={taxvalue}
                                                    onChange={(e) => settaxvalue(e.target.value)}
                                                    min="0"
                                                    placeholder="Ingrese el nuevo monto del impuesto"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    
                        <div className="py-2 text-right">
                            <button disabled={sending || (taxvalue === '' && Number(taxvalue) === 0)} type="button" onClick={() => toggle()} className="btn btn-lg btn-warning px-4 font-weight-bold">
                                {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : <span><i className="far fa-edit mr-3"></i>Actualizar Impuesto</span>}
                            </button>
                        </div>
                </form>
            }


            {tax !== null && taxvalue &&
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader className="h3 font-weight-bold" toggle={toggle}>
                        Actualizar impuesto
                    </ModalHeader>
                    <ModalBody>
                        <h5>¿Desea actualizar el impuesto <strong>{tax.label}</strong>?</h5>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="info" onClick={(e) => GoUpdateTax(e)}>
                        {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : <span><i className="fa fa-check mr-2"></i>confirmar</span>}
                    </Button>
                    <Button color="primary" onClick={toggle}><i className="fa fa-times mr-2"></i>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            }
        </div>
    )
}

export default UpdateTax
