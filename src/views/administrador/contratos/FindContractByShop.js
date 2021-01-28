import React, {useEffect, useState,  useRef} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import { Fragment } from 'react';

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FindContractByShop(props) {
    let id = props.match.params.id;

    const [loading, setloading]             = useState(true);
    const [search,  setSearch]              = useState(true);
    //const [sending, setsending]             = useState(false);
    const [data,    setData]                = useState([]);

    const [numPages, setNumPages] = useState(null);
    const pageNumber = 1;

    const pdfWrapper = useRef(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    
    const downloadPdf = (e, fileurl) => {
        e.preventDefault();
        
        const linkSource = fileurl;
        const downloadLink = document.createElement("a");
        const fileName = "contrato.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    useEffect(() => {
        let url = '/setting/seller/contract/shop/'+id;
        if(loading){
            if(search){
                setSearch(false);
                axios.get(url)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data.data.rsShopContract);
                    setloading(false);
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    }, [id, loading, search]);

    if(!loading) {
        if(data.length > 0){
            return (
                <div>
                    <Link to="/findContract" className="text-info mb-3 d-inline-block">
                        Volver a la lista
                    </Link>
                    <h1 className="h4 mb-3">
                        Lista de contratos de la tienda: <span className="font-weight-bold">{data[0].shop.name}</span>
                    </h1>
                    <Row>
                        {data.map((item, key) => {
                            let shop = item;
                            let contract = item.contractDesc;
                            let date = item.createdAt.split('T');
                            
                            let contractdata = item.contract.data.data;
                            let pdfFile = contractdata.reduce(
                                function (data, byte) {
                                    return data + String.fromCharCode(byte);
                                },
                                ''
                            );
                            
                            console.log(item.contract.data.data);
                            console.log(pdfFile);
                            console.log(pdfFile.split(';')[1]);
                            //console.log(item.contract.data.data);
                            //console.log(_arrayBufferToBase64(item.contract.data.data));
                            console.log(contractdata);

                            //let file = {data: { file: contractdata }}

                            return (
                                <Fragment key={key}>
                                    <Col md="7">
                                            <Card>
                                                <div className="p-3">
                                                    <CardTitle>
                                                        <h6>
                                                            <i className="mdi mdi-border-all mr-2"></i>Número de contrato: 
                                                            <strong className="ml-2">{contract.number}</strong>
                                                        </h6>
                                                    </CardTitle>
                                                </div>
                                                <CardBody className="border-top">
                                                    <h6><i className="fa d-none fa-calendar-alt mr-3"></i>Creación: {date[0]}</h6>
                                                    <hr/>
                                                    <h6 className="font-weight-bold">Datos del contrato: </h6>
                                                    <h6 className="mt-4">
                                                        <i className="fa d-none fa-calendar-alt mr-3"></i>
                                                        Inicio: <span>{contract.inicio}</span> - fin: <span>{contract.fin}</span>
                                                    </h6>

                                                    <h6>Número de productos: <span className="font-weight-normal">{contract.comProduct}</span></h6>
                                                    <h6>Stock mínimo por producto: <span className="font-weight-normal">{contract.minStock}</span></h6>
                                                    <h6>Porcentaje por producto: <span className="font-weight-normal">{shop.proPercen}</span></h6>
                                                    
                                                    <hr/>
                                                    
                                                    <h6>Número de servicios: <span className="font-weight-normal">{contract.comService}</span></h6>
                                                    <h6>Porcentaje por servicios: <span className="font-weight-normal">{shop.servPercen}</span></h6>
                                                    
                                                    <hr/>
                                                    <h6 className="font-weight-normal">Nota:</h6>
                                                    <h6>
                                                        {contract.nota}
                                                    </h6>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col key={key} md="5">
                                        <Card>
                                            <div className="p-3">
                                                <CardTitle>
                                                    <h6>
                                                        <i className="mdi mdi-border-all mr-2"></i>Vista previa
                                                    </h6>
                                                </CardTitle>
                                            </div>
                                            <CardBody className="border-top">
                                            <div className="div-pdf" ref={pdfWrapper}>
                                                <Document
                                                    file={`data:application/pdf;${pdfFile.split(';')[1]}`}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={pageNumber} width={400} />
                                                </Document>
                                                <p>Página <span>{pageNumber}</span> de <span>{numPages}</span></p>
                                                <button onClick={(e) => downloadPdf(e, `data:application/pdf;${pdfFile.split(';')[1]}`)} className="btn btn-info d-block w-100">
                                                    Descargar
                                                </button>
                                            </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Fragment>
                            )
                        })}
                    </Row>
                </div>
            )
        }else{
            return (
                <h1 className="h4 mb-3 font-weight-bold">Sin contratos efectuados.</h1>
            )
        }
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Cargando ..</h1>
            </div>
        )
    }
}

export default withRouter(FindContractByShop);
