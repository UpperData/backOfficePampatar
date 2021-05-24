import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import {useSelector} from 'react-redux'
/*
import {
  RecentComment,
  Chat,
  Projects,
  Activity,
  SalesOverview,
  Visits,
} from "../../components/dashboard";

import img1 from "../../assets/images/users/1.jpg";
import img4 from "../../assets/images/users/4.jpg";
import img5 from "../../assets/images/users/5.jpg";
*/

const Home = () => {

  const session     = useSelector(state => state.session);
  const backoffice  = useSelector((state) => state.backoffice);

  let role = backoffice.role.name;
  let account = session.userData.account;

  return (
    <div>
      <h1 className="h4 mb-3 font-weight-bold">Dashboard</h1>
      <Row>
        {(role === 'Vendedor') &&
          <Col xs={12}>
            <Card>
                <span className="lstick"></span>
                <CardBody>
                  <h4 className="h5 font-weight-bold card-title">Mi tienda</h4>
                  <div className="my-3">
                    <h1 className="text-info font-weight-bold h2"><i className="mdi mdi-store-outline mr-2"></i> {session.userData.shop.name}</h1>
                  </div>
                </CardBody>
            </Card>
          </Col>
        }

        {(role === 'Administrador') &&
          <Col xs={12}>
            <Card>
                <span className="lstick"></span>
                <CardBody>
                  <h4 className="h5 font-weight-bold card-title">Administración</h4>
                  <div className="my-3">
                    <h1 className="text-info font-weight-bold h2"><i className="far fa-user mr-2"></i>{account.email}</h1>
                  </div>
                </CardBody>
            </Card>
          </Col>
        }
      </Row>
    </div>
  );
};

export default Home;
