import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { set_role } from '../../redux/backoffice/Actions';
import Spinner from '../spinner/Spinner';

function SetRole() {

    const session = useSelector(state => state.session);
    const backoffice = useSelector(state => state.backoffice);
    const [setting, setsetting] = useState(false);
    const [loading, setloading] = useState(true);

    let RoleInLocalStorage = localStorage.getItem('role');

    const dispatch = useDispatch();
    let roles = ((session.userData !== null) ? session.userData.role : []);

    const setThisRole = (e, role) => {
        setsetting(true);
        e.preventDefault();
        dispatch(set_role(role));
    }

    useEffect(() => {
        if(loading){
            let validate = RoleInLocalStorage === undefined  || RoleInLocalStorage === 'undefined' || RoleInLocalStorage === null;
            console.log('cargando select de roles');
            console.log(RoleInLocalStorage);
            console.log(validate);
            //console.log(backoffice.role.hasOwnProperty('id'));
            //console.log(backoffice.menu);
            if(validate){
                console.log('renderizando select de roles');
                setloading(false);  
            }       
        }
    });

    if(loading){
        if(backoffice.menu !== null){
            return <Spinner />
        }else{
            return (
                <Spinner />
            )
        }
    }else{
        if(backoffice.menu === null && !backoffice.role.hasOwnProperty('id')){
            return (
                <div className="bg-light d-flex min-vh-100 align-items-center">
                    <div className="container text-center">
                        <h1 className="font-weight-bold">
                            ¿Que rol deseas visualizar?
                        </h1>
                        {(!setting) &&
                            <div className="row justify-content-center py-4">
                                {(roles.length > 0 && roles.map((item, key) => {
                                    return (
                                        <a onClick={(e) => setThisRole(e, item)} href="##" key={key} className="col-md-auto col-12">
                                            <div className="card shadow w-100">
                                                <div className="card-body py-4">
                                                    <h2 className="text-primary py-3 mb-0 text-center font-weight-bold">
                                                        {item.name}
                                                    </h2>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                }))}
                            </div>
                        }
                        {(setting) &&
                            <Spinner />
                        }
                    </div>
                </div>
            )
        }else{
            return <Redirect to='/' />
        }
    }
}

export default SetRole
