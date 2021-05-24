import React, {useState, useEffect} from 'react'
import { Fragment } from 'react';
import Select from 'react-select'

function SizesCombobox(props) {
    const   list                = props.list;
    let     categoriesList      = [];

    const [loading, setloading]                 = useState(true);

    const [sizesList, setsizesList]             = useState(null);
    const [sizesInTypeList, setsizesInTypeList] = useState(null);

    const [category, setcategory]   = useState(props.category !== null ? props.category : null);
    const [sizetype, setsizetype]   = useState(props.sizetype !== null ? props.sizetype : null);
    const [size,    setsize]        = useState(props.size !== null ? props.size : null);

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

    useEffect(() => {
        if(loading){
            if(categoriesList.length > 0){
                setloading(false);
            }
        }else{

        }
    });

    //console.log(result);

    const handleSelectCategory = (data) => {
        let findSizes = result.find(item => item.id === data.value);
        let formatsizes = [];
        //let it = 0;

        console.log(findSizes);

        if(findSizes !== undefined){
            //console.log(data);
            //console.log(findSizes.sizes);
            
            Object.entries(findSizes.sizes).forEach(([key, value]) => {
                let newItem = {};
                //newItem.label   = idkeys;
                newItem.label   = String(key);
                newItem.value   = String(key);

                //newItem.options = [];
                /*
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index];
                        let option = {};
                        option.label   = element;
                        option.value   = String(element).toLowerCase();

                        newItem.options.push(option);
                    }
                */

                formatsizes.push(newItem);
            });

            props.onChangeCategory(data);
            setcategory(data);

            props.onChangeSizeType(null);
            setsizetype(null);

            props.onChangeSize(null);
            setsize(null);

            console.log(formatsizes);
            setsizesInTypeList(formatsizes);
        }
    }

    const handleChangeTypeSize = (data) => {
        if(props.category !== null){
            console.log(result);

            let findSizes = result.find(item => item.id === props.category.value);

            console.log(findSizes);

            let allsizes = findSizes.sizes[data.value];

            let formatSizes = [];

            for (let i = 0; i < allsizes.length; i++) {
                const thissize = allsizes[i];

                let option = {};
                option.label   = thissize;
                option.value   = String(thissize).toLowerCase().trim();
                
                formatSizes.push(option);
            }

            props.onChangeSizeType(data);
            setsizetype(data);

            props.onChangeSize(null);
            setsize(null);

            setsizesList(formatSizes);
        }
    }

    const handleSelectSize = (data) => {
        props.onChangeSize(data);
        setsize(data);
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-5 mb-3">
                    <label htmlFor="">
                        Categoría:
                    </label>
                    <Select 
                        isSearchable={true}
                        value={(categoriesList.length > 0 && props.category) ? props.category : null}
                        placeholder={props.placeholder ? props.placeholder : 'Categoría'} 
                        onChange={handleSelectCategory} 
                        options={categoriesList} 
                    />
                </div>
                <div className="col-lg-4 mb-3">
                    {(sizesInTypeList) &&
                        <Fragment>
                            <label htmlFor="">
                                Tipo:
                            </label>
                            <Select 
                                isSearchable={true}
                                value={(sizesInTypeList.length > 0 && props.sizetype) ? props.sizetype : null}
                                placeholder={props.placeholder ? props.placeholder : 'Talla'} 
                                onChange={(value) => handleChangeTypeSize(value)} 
                                options={sizesInTypeList} 
                            />
                        </Fragment>
                    }
                </div>
                <div className="col-lg-3 mb-3">
                    {(sizesList) &&
                        <Fragment>
                            <label htmlFor="">
                                Talla:
                            </label>
                            <Select 
                                isSearchable={true}
                                value={(sizesList.length > 0 && props.size) ? props.size : null}
                                placeholder={props.placeholder ? props.placeholder : 'Talla'} 
                                onChange={(data) => handleSelectSize(data)} 
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
