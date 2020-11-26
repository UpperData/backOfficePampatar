import React from 'react'
import {Link} from 'react-router-dom'

function TokenExpired() {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <h2 className="font-weight-bold h1">
                            Su sesión ha expirado
                        </h2>
                        <h5>
                            Dirigase al login nuevamente e ingrese los datos de su cuenta para volver a entrar
                        </h5>
                        <div className="my-2">
                            <Link to="/authentication/Login" className="btn font-weight-bold px-4 shadow btn-primary shadow">
                                Volver al login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenExpired
