import React, {useState} from 'react'

function CheckColors(props) {

    const loading = false;
    const list = props.list;
    const [colorSelected, setcolorSelected] = useState('');

    var result = Object.keys(list).map((key) => [String(key), list[key]]);

    const handleCheckColor = (e, color) => {
        let ischecked = e.target.checked;

        if(ischecked){
            setcolorSelected(color);
            props.onChange(color);
        }else{
            setcolorSelected('');
            props.onChange('');
        }
    }

    if(!loading){
        return (
            <div>
                {(result.length > 0 && Array.isArray(result) && result.map((item,key) => {
                    return (
                        <div key={key} className="d-inline-flex">
                            <div className="color-checkbox">
                                <input checked={colorSelected === item[1]} onChange={(e) => handleCheckColor(e, item[1])} id={`check-${item[0]}`} type="checkbox"/>
                                <label htmlFor={`check-${item[0]}`}>
                                    <span style={{backgroundColor: item[1]}} className="color"></span>
                                </label>
                            </div>
                        </div>
                    )
                }))}
            </div>
        )
    }
}

export default CheckColors
