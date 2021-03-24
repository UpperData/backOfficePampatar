import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useSelector} from 'react-redux'

function CategoriesLvlThree(props) {

    let listcat = [];
    const [categoryParent, setcategoryParent]   = useState((props.categoryParent !== undefined && props.categoryParent !== null) ? props.categoryParent : 0);
    const [categorieslvltwo, setcategorieslvltwo] = useState((props.categorieslvltwo !== undefined && props.categorieslvltwo !== null) ? props.categorieslvltwo : []);

    if(props.list !== null && props.list !== undefined) {
        listcat = props.list;
    }

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    //console.log(props.list);
    
    const formatData = () => {
        
        let newList = [];
        let ids = [];

        //console.log(props.categoryParent);
        //console.log(props.categorieslvltwo);

        if(Array.isArray(props.categorieslvltwo) && props.categorieslvltwo.length > 0){
            let cat2list  = props.list.find(item => item.id === categoryParent).cat2s;

            for (let i = 0; i < props.categorieslvltwo.length; i++) {
                const subcategory = props.categorieslvltwo[i];
                //console.log(subcategory);
                ids.push(subcategory.value);
            }

            let cat3sParents = cat2list.filter(item => ids.includes(item.id));

            if(cat3sParents.length > 0){
                for (let i = 0; i < cat3sParents.length; i++) {
                    const parent = cat3sParents[i].cat3s;

                    for (let j = 0; j < parent.length; j++) {
                        const cat3 = parent[j];
                        let newCat = {};
                        newCat.label = cat3.name;
                        newCat.value = cat3.id;
                        //
                        newList.push(newCat);
                    }

                }
            }

            //console.log(newList);

            setList(newList);
            setLoading(false);
        }else{
            setList([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(loading){
            if(props.list !== null && props.list !== undefined) {
                formatData();
            }
        }else{
            
            if(categoryParent !== props.categoryParent){
                setcategoryParent(props.categoryParent);
                formatData();
            }
            
            if(categorieslvltwo !== props.categorieslvltwo){
                setcategorieslvltwo(props.categorieslvltwo);
                formatData();
            }

        }
    });

    const handleSelect = async (selectedOption) => {
        //console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        //console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando categorias"  
                options={[]} 
            />
        )
    }else{
        let elementSelected = null;

        /*
        if(props.value !== undefined && props.value !== null && list.length > 0){
            let findElement = list.find(item => item.value === props.value.value);
            elementSelected = findElement;
            //console.log(findElement);
            //console.log(props.value);
        }
        */

        return (
            <Select 
                isSearchable={true}
                isMulti
                placeholder="Categorias de tercer nivel" 
                value={(props.value !== undefined && props.value !== null && list.length > 0) ? props.value : null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default CategoriesLvlThree
