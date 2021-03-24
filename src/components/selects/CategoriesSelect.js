import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function CategoriesSelect(props) {

    let url = '/menu';

    const [loading,     setLoading]     = useState(true);
    const [search,      setsearch]      = useState(true);

    const [count,       setcount]       = useState(0);

    const [items,       setitems]       = useState([])
    const [list,        setList]        = useState([]);
    const [listlvl2,    setlistlvl2]    = useState([]);
    const [listlvl3,    setlistlvl3]    = useState([]);
    const [listlvl4,    setlistlvl4]    = useState([])

    useEffect(() => {
        if(loading){
            if(search){
                const getData = () => {
                    axios.get(url).then((res) => {
                        console.log(res.data);
                        let items = res.data.data.menu.filter(item => item.name === props.parentCategoryId);
                        setitems(items);
                        console.log(items);
                        
                        let newList = [];
                        let newListlvl2 = [];
                        let newListlvl3 = [];
                        let newListlvl4 = [];

                        //console.log(items);

                        for(var i=0; i < items.length; i++){
                            
                            let thisElement = items[i];
            
                            let formattedElement = {};
                            formattedElement.label = thisElement.name;
                            formattedElement.value = thisElement.id;
                            
                            let cat2 = thisElement.cat2s;

                            if(cat2.length > 0){
                                for (let i2 = 0; i2 < cat2.length; i2++) {
                                    const thisElement2 = cat2[i2];

                                    let formattedElement2 = {};
                                    formattedElement2.label = thisElement2.name;
                                    formattedElement2.value = thisElement2.id;

                                    newListlvl2.push(formattedElement2);
                                }
                            }
            
                            newList.push(formattedElement);
                        }           
            
                        setList(newList);
                        setlistlvl2(newListlvl2);

                        setLoading(false);
                    });
                }

                setsearch(false);
                getData();
            }
        }
    }, [loading,search, url]);

    const handleSelect = async (selectedOption) => {
        console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    const handleChangeSubTwo = (val) => {
        
        let allcat3 = [];
        let idCatsSelected = [];
        let itemInList = items[0].cat2s;

        if(val.length > 0){
            for (let i = 0; i < val.length; i++) {
                let thiscat2 = val[i];
                idCatsSelected.push(thiscat2.value);
            }
        }

        let filterCatsSelected = itemInList.filter(item => idCatsSelected.includes(item.id));
        if(filterCatsSelected.length > 0){
            for (let i = 0; i < filterCatsSelected.length; i++) {
                let thiscat2selected = filterCatsSelected[i];
                let thiscat3s = thiscat2selected.cat3s;

                if(thiscat3s.length > 0){
                    for (let j = 0; j < thiscat3s.length; j++) {
                        const thisElement3 = thiscat3s[j];

                        let formattedElement3 = {};
                        formattedElement3.label = thisElement3.name;
                        formattedElement3.value = thisElement3.id;

                        allcat3.push(formattedElement3);
                    }
                }
            }
        }

        console.log(allcat3);
        setlistlvl3(allcat3);

    }

    if(loading){
        return (
            <Select 
                placeholder="Cargando categorías"  
                options={[]} 
            />
        )
    }else{

        if(props.withoutParentCategory){
            //console.log(findElement);
            //console.log(props.value);

            let categorySelected = list.find(item => item.name === props.parentCategoryId);

            return (
                <div>
                    <h6 className="text-muted mb-3">
                        <strong>{categorySelected.label}</strong>
                    </h6>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="">Nivel 2:</label>
                        <Select 
                            isSearchable={true}
                            isMulti
                            placeholder="Sub categoria nivel 2" 
                            //value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                            onChange={handleChangeSubTwo} 
                            options={listlvl2} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nivel 3:</label>
                        <Select 
                            isSearchable={true}
                            isMulti
                            placeholder="Categoría" 
                            //value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                            //onChange={handleSelect} 
                            //options={list} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nivel 4:</label>
                        <Select 
                            isSearchable={true}
                            isMulti
                            placeholder="Categoría" 
                            //value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                            //onChange={handleSelect} 
                            //options={listlvl2} 
                        />
                    </div>
                </div>
            )
        }else{
            let elementSelected = null;

            if(props.value !== undefined && props.value !== null && list.length > 0){
                let findElement = list.find(item => item.value === props.value.value);
                //console.log(findElement);
                //console.log(props.value);
                elementSelected = findElement;
            }

            return (
                <Select 
                    isSearchable={true}
                    placeholder="Categoría" 
                    value={(props.value !== undefined && props.value !== null && list.length > 0) ? elementSelected : null}  
                    onChange={handleSelect} 
                    options={list} 
                />
            )
        }
    }
}

export default CategoriesSelect
