import React, {useState, useEffect} from 'react'
import MaterialOffSelect from '../selects/MaterialOffSelect'

function Materials(props) {

    const [materialslist, setmaterialslist] = useState(props.value === null ? [] : props.value);
    const [count, setcount]                 = useState(0);

    useEffect(() => {
        if(materialslist.length === 0 && (props.value !== null && props.value.length > 0)){
            setmaterialslist(props.value);
        }else{
            if(props.value !== materialslist){
                props.onChange(materialslist);
            }else{
                //console.log(props.value);
            }
        }
    });

    const DeleteItem = (id) => {
        let list                = materialslist;
        let listwithoutItem     = list.filter(item => item.id !== id);
        console.log(listwithoutItem);

        if(listwithoutItem.length > 0){
            for (let i = 0; i < listwithoutItem.length; i++) {
                const item = listwithoutItem[i];
                item.id = i+1;
            }
        }else{
            listwithoutItem = [];
            props.onChange(listwithoutItem);
        }

        setmaterialslist(listwithoutItem);
        setcount(count + 5);
    }

    const addMaterial = () => {
        let newList = materialslist === null ? [] : materialslist;

        let newMaterial = {
            id: newList.length + 1,
            type: null,
            qty: ''
        }
        newList.push(newMaterial);
        setmaterialslist(newList);
        setcount(count + 5);
    }

    const changeItem = (type, value, item) => {
        let list       = materialslist;
        let itemIn     = list.indexOf(item);
        item[type]     = value;
        list[itemIn]   = item;

        setmaterialslist(list);
        setcount(count + 5);
        
        //console.log(itemIn);
    }

    return (
        <div>
            <label className="mb-3" htmlFor="">
                Materiales:
            </label>

            {(materialslist === null || materialslist.length < 1) &&
                <div className="materials-empty">
                    <div className="alert alert-warning font-weight-bold mb-3">
                        <p className="mb-0">
                            <i className="fa fa-exclamation-triangle mr-2"></i>Sin materiales añadidos.
                        </p>
                    </div>
                </div>
            }

            {materialslist !== null && Array.isArray(materialslist) && materialslist.length > 0 &&
                <div>
                    {materialslist.map((item, key) => {
                        
                        return (
                            <div key={key} className="row mb-3 align-items-end">
                                <div className="col-12">
                                    <h6 className="font-weight-bold mb-2">Material #{item.id}</h6>
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label">
                                        Materiales de fabricación
                                    </label>
                                    <div className="form-group mb-0">
                                        {item.type === null || item.type.hasOwnProperty("value") && item.type.value !== "non_id" ?
                                            <MaterialOffSelect value={item.type}  onChange={(value) => changeItem('type', value, item)} />
                                        :
                                            <input className="form-control" value={item.type.label} readOnly />
                                        }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label">
                                        Cantidad
                                    </label>
                                    <div className="form-group mb-0">
                                        <input 
                                            value={item.qty}
                                            onChange={(e) => changeItem('qty', e.target.value, item)}
                                            min="0"
                                            max="5000"
                                            type="number" 
                                            className="form-control"
                                            placeholder="Cantidad"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button 
                                        type="button" 
                                        onClick={() => DeleteItem(item.id)} 
                                        className="btn btn-danger btn-block"
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }

            <button type="button" onClick={() => addMaterial()} className="btn btn-block btn-primary my-2 font-weight-bold">
                Añadir material
            </button>
        </div>
    )
}

export default Materials
