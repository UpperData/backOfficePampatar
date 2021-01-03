import React, {useState, useEffect} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { set_role, set_backoffice_menu } from '../../redux/backoffice/Actions';
import Spinner from '../spinner/Spinner';
import { AuthenticationService } from '../../jwt/_services';

import StoreImg from '../../assets/images/store.png';
import AdminImg from '../../assets/images/admin.png';

function SetRole(props) {

    //console.log('ok');
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
        let roleUrl = `/admin-panel/${role.id}`;
        let result = AuthenticationService.getMenuItems(roleUrl);
        result.then((res) => {
          //console.log(res);
          props.history.push('/');
          dispatch(set_backoffice_menu(res.data));
        }).catch((err) => {
          console.error(err);
        });
    }

    useEffect(() => {
        if(loading){
            let validate = RoleInLocalStorage === undefined  || RoleInLocalStorage === 'undefined' || RoleInLocalStorage === null;
            console.log('cargando select de roles');
            //console.log(RoleInLocalStorage);
            //console.log(validate);
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
                                    if(item.name !== 'Comprador'){

                                        let imgUrl = StoreImg;
                                        if(item.name === 'Administrador'){
                                            imgUrl = AdminImg;
                                        }

                                        return (
                                            <a onClick={(e) => setThisRole(e, item)} href="##" key={key} className="col-md-auto role-label col-12">
                                                <img src={imgUrl} width="220" height="220" alt={item.name} />
                                                
                                                <h2 className="text-secondary role-text h5 py-3 mb-0 text-center font-weight-bold">
                                                    {item.name}
                                                </h2>
                                                    
                                            </a>
                                        )
                                    }
                                }))}
                            </div>
                        }
                        <h5 className="h6 text-muted"><i className="mdi mdi-account-switch mr-2"></i> <strong>Clickea</strong> para cambiar al rol seleccionado</h5>
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

export default withRouter(SetRole);
