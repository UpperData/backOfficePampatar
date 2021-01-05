import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import axios from 'axios';
import {handleLogin} from '../../redux/session/Actions';
import {withRouter, Link} from 'react-router-dom'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CustomInput,
  Form,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";
import validators from "./Validators";

import img2 from "../../assets/images/big/auth-bg.jpg";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
};

const Login2 = (props) => {

  const [errors,              setErrors]              = useState([]);
  const [errorMessage,        setErrorMessage]        = useState('');
  const [sending,             setSending]             = useState(false);
  const [email, setEmail]                             = useState("");
  const [password, setPassword]                       = useState("");
  const loading = true;

  const dispatch = useDispatch();

  const onInputChange = (e) => {
    formValidators([e.target.name], e.target.value);
  };

  let search = ((props.location.search !== '' && props.location.search !== null) ? props.location.search : null);
  let state = ((props.location.state !== '' && props.location.state !== null) ? props.location.state : null);

  let query = null;

  let withTkn = null;
  let tkn = null;

  if(search !== null){
    query = new URLSearchParams(props.location.search);
    withTkn = query.get('withTkn');
    if(withTkn !== null && withTkn !== undefined){
      tkn = query.get('tkn');
    }

    console.log(withTkn);
    console.log(tkn);
  }

  
  const formValidators = (fieldName, value) => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      }
    });
  };

  /*
  const validForm = () => {
    let status = true;
    Object.keys(validators).forEach((field) => {
      if (field === "email" || field === "password") {
        if (!validators[field].valid) {
          status = false;
        }
      }
    });
    return status;
  };
  */

  const showErrors = (fieldName) => {
    const validator = validators[fieldName];
    const result = "";
    /*
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
            <br />
          </span>
        );
      });
      return <div className="error mb-2">{errors}</div>;
    }
    */
    return result;
  };


  function ValidateEmail(mail) {

      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
          return (true)
      }

      return (false)
  }

  const validateForm = () => {
      let validEmail = ValidateEmail(email);

      if(email.length === 0){
          let errors = {
              email: 'Debe ingresar un correo electrónico'
          }

          setErrors(errors);
          return false;
      }else if(!validEmail){
          let errors = {
              email: 'Verifique su correo electrónico, formato invalido'
          }

          setErrors(errors);
          return false;
      }

      if(password.length === 0){
          let errors = {
              password: 'No puede dejar la contraseña en blanco'
          }
          setErrors(errors);
          return false;
      }else if(password.length < 6){
          let errors = {
              password: 'Su contraseña es muy corta, por favor verifique sus datos'
          }
          setErrors(errors);
          return false;
      }else if(password.length > 15){
          let errors = {
              password: 'Su contraseña es muy larga, por favor verifique sus datos'
          }
          setErrors(errors);
          return false;
      }

      return true;
}

const login = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setErrors([]);
    setErrorMessage('');
    let validate = validateForm();

    if(!validate){
        //alert('No fue posible validar el formulario');
    }else{
        setSending(true);

        axios({
            url: '/login/back',
            method: 'POST',
            data: {
                email,
                pass: password
            }
        }).then((res) => {
            setSending(false);

            if(res.data.data.result === false){
                console.log('Datos erroneos');
                window.scrollTo({top: 0, behavior: 'smooth'});
                setErrorMessage(res.data.data.message);
            }else{
                //usuario logeado
                console.log(res.data);
                dispatch(handleLogin(res.data.data));
                props.history.push('/');
            }

        }).catch((err) => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            console.error(err);
            setSending(false);
        });
    }
}

  console.log('------------------------------------')
  //console.log('AUTH', auth);
  //console.log('USUARIO', user);

  useEffect(() => {
    if(tkn !== null){
      if(loading){
        let config = {
          headers: {
            'Authorization': `Bearer ${tkn}`
          }
        }
        let url = '/boLogin/'+tkn;
        axios.get(url, config).then((res) => {
          if(res.data.data.result){
            console.log('Logueado');
            console.log(res.data);
            let allData = res.data.data;
            allData.token = tkn;
            dispatch(handleLogin(res.data.data));
          }
        }).catch((err) => {
          //props.history.push('/');
          if(err.response.data !== null && err.response.data !== undefined){
            console.log(err.response.data.data.message);
            let location = {
              path: '/',
              state: {errorMessage : err.response.data.data.message}
            }

            props.history.push(location);
          }
        });
      }
    }
  }, []);

  if(tkn === null){
    return (
      <div
        className="auth-wrapper  align-items-center d-flex"
        style={sidebarBackground}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/*Login2 Cards*/}
        {/*--------------------------------------------------------------------------------*/}
        <div className="container">
          <div>
            <Row className="no-gutters justify-content-center">
              {state !== null && state !== undefined && typeof state === 'object' && state.hasOwnProperty('errorMessage') && 
                <div className="col-12 col-lg-9">
                  <div className="alert alert-danger">
                    {state.errorMessage}
                  </div>
                </div>
              }
              {(errorMessage !== '') && 
                <div className="col-12 col-lg-9">
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                </div>
              }
              <Col md="6" lg="4" className="bg-dark d-none d-md-flex text-white">
                <div className="p-4">
                  <h3 className="display-5">
                    Bienvenido,
                    <br /> <span className="text-primary font-bold">Artesano</span>
                  </h3>
                  <p className="op-5 mt-4">
                    Este es el sistema administrativo de <strong>Pampatar</strong> en el cual podrá administrar su tienda y mirar su progreso a través de nuestra plataforma.
                  </p>
                  <p className="mt-5">Ingrese con su cuenta de Pampatar.cl</p>
                </div>
              </Col>
              <Col md="6" lg="5" className="bg-white">
                <div className="p-4">
                  <h3 className="font-medium mb-3 font-weight-bold">Ingresar al administrador</h3>
                  <Form onSubmit={(e) => login(e)} className="mt-3" action="/dashbaord">
                    <Label for="email" className="font-medium">
                      Correo Electrónico
                    </Label>
                    <InputGroup className="mb-2" size="lg">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ti-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          onInputChange(e);
                        }}
                        placeholder="Correo Electrónico"
                      />
                    </InputGroup>
                    {showErrors("email")}
                    <Label for="password" className="mt-3 font-medium">
                      Contraseña
                    </Label>
                    <InputGroup className="mb-3" size="lg">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ti-pencil"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          onInputChange(e);
                        }}
                        placeholder="Contraseña"
                      />
                    </InputGroup>
                    {showErrors("password")}
                    <div className="d-none no-block align-items-center mb-4 mt-4">
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox"
                        label="Remember Me"
                      />
                    </div>
                    <Row className="mb-3">
                      <Col xs="12">
                        <Button
                          disabled={sending}
                          color="primary"
                          size="lg"
                          type="submit"
                          block
                        >
                          {(sending) ? <span>cargando<i className="fa fa-spin fa-spinner ml-3"></i></span> : 'Ingresar'}
                        </Button>
                      </Col>
                    </Row>
                    <Link className="d-none" to="/session/token-expired">
                        token expirado
                    </Link>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }else{
    return(
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div>
          <h2 className="h1 font-weight-bold">Espere un momento</h2>
          <h4>Redireccionando .....</h4>
        </div>
      </div> 
    )
  }
};

export default withRouter(Login2);
