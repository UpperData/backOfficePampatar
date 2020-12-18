import React, {useState} from 'react'
import { Fragment } from 'react';
import Select from 'react-select'

function SizesCombobox(props) {
    const   list                = props.list;
    let     categoriesList      = [];
    //let   sizesList           = [];
    const [sizesList, setsizesList] = useState(null);

    const [category, setcategory]   = useState(null);
    const [size,    setsize]        = useState(null);

    let result = [];
    let idkeys = 0;

    Object.entries(list).forEach(([key, value]) => {
        let newItem = {};
        newItem.id      = idkeys;
        newItem.name    = String(key);
        newItem.sizes   = value;

        let newCat = {};
        newCat.label = String(key);
        newCat.value = idkeys;

        idkeys++;
        result.push(newItem);
        categoriesList.push(newCat);
    });

    //console.log(result);

    const handleSelectCategory = (data) => {
        setcategory(data);
        let findSizes = result.find(item => item.id === data.value);
        let formatsizes = [];
        let it = 0;

        if(findSizes !== undefined){
            //console.log(data);
            //console.log(findSizes.sizes);
            
            Object.entries(findSizes.sizes).forEach(([key, value]) => {
                let newItem = {};
                //newItem.label   = idkeys;
                newItem.label   = String(key);
                newItem.options = [];

                for (let index = 0; index < value.length; index++) {
                    const element = value[index];
                    let option = {};
                    option.label   = element;
                    option.value   = String(element).toLowerCase();

                    newItem.options.push(option);
                }

                formatsizes.push(newItem);
            });

            console.log(formatsizes);
            setsizesList(formatsizes);
        }
    }

    const handleSelectSize = (data) => {
        console.log(data);
        setsize(data);
        props.onChange(data);
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-8">
                    <label htmlFor="">
                        Categoría:
                    </label>

                    <Select 
                        isSearchable={true}
                        value={(categoriesList.length > 0 && category) ? category : null}
                        placeholder={props.placeholder ? props.placeholder : 'Categoría'} 
                        onChange={handleSelectCategory} 
                        options={categoriesList} 
                    />
                </div>
                <div className="col-lg-4">
                    {(sizesList) &&
                        <Fragment>
                            <label htmlFor="">
                                Talla:
                            </label>
                            <Select 
                                isSearchable={true}
                                value={(sizesList.length > 0 && size) ? size : null}
                                placeholder={props.placeholder ? props.placeholder : 'Talla'} 
                                onChange={handleSelectSize} 
                                options={sizesList} 
                            />
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default SizesCombobox
