import React, {useState, useEffect} from 'react'
import {withRouter, Link} from "react-router-dom"
import {Row,Col,Card,CardBody,CardTitle,Breadcrumb, BreadcrumbItem} from 'reactstrap';
import MyBidsSelect from '../../../components/selects/MyBidsSelect';
import BidsSellerAd from './BidsSellerAd';

function UpdateBid(props) {

    const [bidSelected, setbidSelected]         = useState(null);
    const [successMessage, setsuccessMessage]   = useState("");

    const changeBidSelected = (value) => {
        setbidSelected(value);
        setsuccessMessage("");
    }

    const reset = (message) => {
        setbidSelected();
        setsuccessMessage(message);
        console.log(message);
        setTimeout(() => {
            setsuccessMessage("");
        }, 5000);
    }

    useEffect(() => {
        if(props.match.params.id){
            changeBidSelected(props.match.params.id);
        }
    }, []);

    return (
        <div>
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Actualizar publicación</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    {(props.match.params.id) ? 
                        <Link to="/bidsSellerList" className="text-info mr-3"><i className="fa fa-angle-left"></i></Link>
                    : 
                        ""
                    }
                    Actualizar publicación {(props.match.params.id) ? "#"+props.match.params.id : ""}
                </h1>
                {(successMessage !== "") &&
                    <div className="alert alert-success mb-3">
                        {successMessage}
                    </div>
                }
                {(!props.match.params.id) &&
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        Seleccione una publicación.
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <MyBidsSelect 
                                        value={bidSelected} 
                                        onChange={(value) => changeBidSelected(value)} 
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                }
                {(bidSelected !== null) &&
                    <BidsSellerAd reset={reset} edit bidSelectedByEdit={!props.match.params.id ? bidSelected.value : props.match.params.id} />
                }
            </div>
        </div>
    )
}

export default withRouter(UpdateBid);
