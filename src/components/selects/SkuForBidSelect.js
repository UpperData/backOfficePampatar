import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function SkuForBidSelect(props) {

    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);

    let typeBid = props.typeBid;
    let typeBidName = typeBid === 3 ? 'service' : 'product';

    let url = '/sKU/inventOry/avaIlabLe/gET/'+typeBidName+'/'+typeBid+'';

    useEffect(() => {
        if(loading){
            if(search){
                const getData = () => {
                    axios.get(url).then((res) => {
                        console.log(res.data);
                        let services = res.data;
                        let newList = [];
            
                        for(var i=0; i < services.length; i++){
                            
                            let thisElement = services[i];
            
                            let formattedElement = {};
                            formattedElement.label = thisElement.name;
                            formattedElement.value = thisElement.id;
            
                            newList.push(formattedElement);
                        }            
            
                        setList(newList);
                        setLoading(false);
                    });
                }

                setsearch(false);
                getData();
            }
        }
    }, [loading,search,url]);

    const handleSelect = async (selectedOption) => {
        console.log(selectedOption);
        //props.setRegion({});
        //props.setCity({});
        console.log(selectedOption);
        props.onChange(selectedOption); 
    };

    if(loading){
        return (
            <Select 
                placeholder="Cargando"  
                options={[]} 
            />
        )
    }else{
        return (
            <Select 
                isSearchable={true}
                placeholder="Tipo" 
                value={(props.value !== undefined && props.value !== null) ? props.value :null} 
                onChange={handleSelect} 
                options={list} 
            />
        )
    }
}

export default SkuForBidSelect
