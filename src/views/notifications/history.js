import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import InlineSpinner from '../spinner/InlineSpinner' 

import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    UncontrolledTooltip,
    Badge,
    Breadcrumb, 
    BreadcrumbItem, 
} from 'reactstrap';

function NotificationsList(props) {

    const [loading, setloading]     = useState(true);
    const [search,  setsearch]      = useState(true);
    const [data,    setdata]        = useState(null);

    const session     = useSelector(state => state.session);
    const backoffice  = useSelector((state) => state.backoffice);

    let role      = backoffice.role.name;
    let roleId    = backoffice.role.id;

    const getData = () => {
        console.log("Buscando notificaciones");
        let url     = '/GEt/NoTifiCATION/useRS/ROLE/';
        url     = url+roleId;

        axios.get(url).then((res) => {
            console.log(res.data);
            setdata(res.data);
            setloading(false);
        }).catch((err) => {
            console.error(err);
        });
    }
    
    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    });

    const showNotificationData = (id) => {
        props.history.push("/notifications/view/"+id);
    }

    return (
        <div>
            <Breadcrumb listClassName="px-0">
                <BreadcrumbItem><a href="##">Notificaciones</a></BreadcrumbItem>
                <BreadcrumbItem active>Lista de notificaciones</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="h4 mb-3 font-weight-bold">
                Lista de notificaciones
            </h1>
            <Row>
                {(loading) && 
                    <InlineSpinner />          
                }

                {(data !== null) &&
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <table className="table table-hover">
                                    <thead>
                                        <th>

                                        </th>
                                        <th>
                                            Título
                                        </th>
                                        <th>
                                            Contenido
                                        </th>
                                        <th>
                                            Extra
                                        </th>
                                    </thead>
                                    <tbody className="m-0 p-0 list-unstyled">
                                        {typeof session.notifications === "object" && session.notifications.hasOwnProperty("rows") && session.notifications.count > 0 && session.notifications.rows.map((notification, index) => {
                                            return (
                                                <tr onClick={() => showNotificationData(notification.id)} style={{cursor: "pointer"}} className="message-item" key={index}>
                                                    <td style={{width: "50px"}}>
                                                        <span
                                                            className={
                                                                "btn btn-circle btn-info"
                                                            }
                                                        >
                                                            <i className={"mdi mdi-message"} />
                                                        </span>
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {notification.body.title}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {notification.body.text}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {notification.body.extra}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                }
            </Row>
        </div>
    )
}

export default withRouter(NotificationsList);
