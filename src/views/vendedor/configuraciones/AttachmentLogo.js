import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';
import axios from 'axios';
import CustomFileInput from '../../../components/files/CustomFileInput';
import DefaultLogo64 from '../../../components/files/DefaultLogo';
import InlineSpinner from '../../spinner/InlineSpinner';
import { set_store_logo } from '../../../redux/session/Actions';

function AttachmentLogo() {

    let urlGet = '/seller/get/logo';
    const dispatch = useDispatch();

    const [loading, setloading]             = useState(true);
    const [search,  setSearch]              = useState(true);
    const [data,    setData]                = useState(null);

    const [logo, setlogo] = useState(null);
    const [binarylogo, setbinarylogo] = useState(null);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');

    /*
    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    */

    const getData = () => {
        setSearch(false);
        axios.get(urlGet)
        .then((res) => {
            console.log(res.data);
            //let decode = String.fromCharCode.apply(null, res.data.data.rsShop.logo.data);
            let logoshop = res.data.data.rsShop.logo.data.reduce(
                function (data, byte) {
                    return data + String.fromCharCode(byte);
                },
                ''
            );
            setData(logoshop);
            setloading(false);
        }).catch((err) => {
            console.error(err);
            setloading(false);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                getData();
            }
        }
    });

    const changeLogo = (e) => {
        let url = '/seller/update/logo';

        e.preventDefault();
        e.stopPropagation();
        setsuccessmessage('');

        let data = {
            logo: binarylogo
        }
        console.log(data);

        
        setsending(true);
        axios({
            url,
            data,
            method: 'put'
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                window.scrollTo({top: 10, behavior: 'smooth'});
                setsuccessmessage(res.data.data.message);
                dispatch(set_store_logo());
            }
            setsending(false);
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    let showImg = (binarylogo !== null) ? binarylogo : DefaultLogo64;

    if(!loading){
        console.log(data);
        if(binarylogo !== null){
            console.log(binarylogo);
            console.log(binarylogo.length);
        }
        
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Configuraciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Agregar logo</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="h4 mb-3 font-weight-bold">Agregar logo</h1>

                {(successmessage !== '') &&
                    <div className="mb-2 alert alert-success">
                        {successmessage}
                    </div>
                }

                <form onSubmit={(e) => changeLogo(e)} action="">
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    Logo de la tienda
                                </div>
                                <CardBody className="border-top">
                                        <Row className="align-items-center justify-content-center">
                                            <Col sm="4">
                                                <div className="img-circle mx-auto" style={{backgroundImage: 'url("data:image/png;base64,'+((data !== null && binarylogo === null) ? data : showImg)+'")'}}></div>
                                            </Col>
                                            <Col sm="5">
                                                <CustomFileInput returnFileType='base64' showPreview={true} value={logo} setBinary={setbinarylogo} onChange={setlogo} />
                                                <small className="pt-3"><strong>Nota:</strong> solo archivos png/jpg/jpeg</small>
                                            </Col>
                                        </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div className="text-right">
                        <button disabled={sending} className="btn btn-lg font-weight-bold btn-primary">
                            {(sending) ? <span><i className="mr-2 fa fa-spin fa-spinner"></i>Guardando</span> : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        )
    }else{
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Configuraciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Agregar logo</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">Agregar logo</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default AttachmentLogo
