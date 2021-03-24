import React, {useState, useEffect} from 'react'
import axios from "axios"
import InlineSpinner from '../../spinner/InlineSpinner';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table
} from 'reactstrap';

function List() {

    const [loading, setloading]                 = useState(true);
    const [search, setsearch]                   = useState(true);
    const [list, setlist]                       = useState([]);
    const [bidSelected, setbidSelected]         = useState(null)

    let url = "/seLLer/pUBLIctIons/get/ALl";

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);

                axios.get(url).then((res) => {
                    console.log(res.data);
                    setlist(res.data);
                    setloading(false);
                }).catch((err) => {
                    console.error(err);
                    setloading(false);
                });
            }
        }
    }, []);

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    Listar publicaciones
                </h1>
                <Card>
                    <CardBody className="border-bottom">
                        <CardTitle className="mb-0 font-weight-bold">
                            <i className="fa fa-list mr-2"></i>
                            Publicaciones
                        </CardTitle>
                    </CardBody>
                    <CardBody className="pb-5">
                        <Row>
                            <Col xs="12">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Imagen principal
                                            </th>
                                            <th>
                                                Titulo
                                            </th>
                                            <th>
                                                Tipo de publicacion
                                            </th>
                                            <th>
                                                Estatus
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(list.length > 0 && list.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        {item.skuId}
                                                    </td>
                                                    <td>
                                                        
                                                    </td>
                                                    <td>
                                                        {item.title}
                                                    </td>
                                                    <td>
                                                        
                                                    </td>
                                                    <td>
                                                        {item.status[0].name}
                                                    </td>
                                                </tr>
                                            )
                                        }))}

                                        {(list.length === 0 &&
                                            <tr>
                                                <td colSpan="80" className="text-center">
                                                    Sin publicaciones creadas
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    Listar publicaciones
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default List
