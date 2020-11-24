import React from 'react'
import StepZilla from 'react-stepzilla';
import {
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';

//steps
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepFour from './StepFour';

function BidsSellerAd() {

    /*
    let example = {
        skuId:x,
        bidTypeId:1,
        photos:[{"id":1},{"id":2}], 
        //title:"Zapatos de Cuero 1",  
        brandId:1,
        //longDesc:"Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,Bla, bla,",
        //smallDesc:"Bla, bla,Bla, bla,Bla, bla,",
        //tags:[{"name":"zapatos"},{"name":"cuero"},{"name":"hombres"}], 
        //category:[{"category":[{"id":4,"name":"Ropa"}],"subCategory":[{"id":1,"name":"Hombre"},{"id":2,"name":"Cuero"}]}], 	
        StatusId:1, 
        statusPId:[{"id":2,"name":"En Evaluación"}], 
        garanty:9,
        customizable:true,
        customize:"Con mi nombre",
        include:"Par de Zapatos con trenzas", 
        devolution:true,
        time:1, 
        disponibility:1,
        //weight:0.8, 
        //dimesion:{"height":17,"width":32,"depth":2},
        //materials:[{id:1,name:'Madera',quantity:12,note:'xeeee'}]
    }
    */

    const steps = [
        { 
            name: 'Datos principales', 
            component:  <StepOne 
                            //getStore={() => (this.getStore())} 
                            //updateStore={(u) => { this.updateStore(u) }} 
                        /> 
        },
        { 
            name: 'Detalles', 
            component:  <StepTwo 
                            //getStore={() => (this.getStore())} 
                            //updateStore={(u) => { this.updateStore(u) }} 
                        /> 
        },
        { 
            name: 'Personalización', 
            component:  <StepFour
                            //getStore={() => (this.getStore())} 
                            //updateStore={(u) => { this.updateStore(u) }} 
                        /> 
        }
    ];
            
    return (
        <div>
            <h1 className="h4 d-none mb-3 font-weight-bold">
                Crear publicación
            </h1>
            <Card>
				<CardBody className="border-bottom">
					<CardTitle className="mb-0">
                        <i className="mdi mdi-border-right mr-2"></i>Datos de la publicación
                    </CardTitle>
				</CardBody>
				<CardBody>
					<div className='example'>
						<div className='step-progress'>
                            <StepZilla
								steps={steps}
                                //nextTextOnFinalActionStep={"Guardar"}
                                nextButtonText="Siguiente"
                                backButtonText="Atrás"
							/>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default BidsSellerAd
