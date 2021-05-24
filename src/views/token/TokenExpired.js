import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { handleLogout } from '../../redux/session/Actions';

function TokenExpired() {

    const dispatch = useDispatch();
    const [loading, setloading] = useState(true);
    //const [logout, setlogout] = useState(false);


    useEffect(() => {

        if(loading){
            setloading(false);
            dispatch(handleLogout());
        }

    },[dispatch, loading]);

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 text-center">
                        <div className="d-inline-flex align-items-center shadow bg-warning justify-content-center mb-4" style={{width: '120px', height: '120px', borderRadius: '50%', fontSize: '6em'}}>
                            <i className="mdi mdi-clock text-white"></i>
                        </div>
                        <h2 className="font-weight-bold h1 mb-4">
                            ¡Su sesión ha expirado!
                        </h2>
                        <h4 className="my-4">
                            <strong>Inicie sesión</strong> nuevamente e ingrese los datos de su cuenta para seguir administrando su cuenta.
                        </h4>
                        <div className="my-2">
                            <Link to="/authentication/Login" className="btn btn-lg font-weight-bold px-4 shadow btn-primary shadow">
                                Volver a iniciar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenExpired
