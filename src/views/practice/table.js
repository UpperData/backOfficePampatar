import React, {useState} from 'react'
import InlineSpinner from '../spinner/InlineSpinner';
//import Spinner from '../spinner/Spinner';
import {Link} from 'react-router-dom'

import {data} from './data'

function Table() {

    const [filterBySearch, setFilterBySearch]   = useState('');
    const [filterByStatus, setfilterByStatus]   = useState(null);

    const [searchByText,    setsearchByText]   = useState(false);

    const [list,  setlist]    = useState(data);
    const [count, setcount]   = useState(0);

    const getFilterClass = (data) => {
        switch (data) {
            case 'desc':
                return ('caret-down')

            case 'asc':
                return ('caret-up')

            case null:
                return ('sort')

            default:
                return ('sort')
        }
    }

    const filterBy = (type = '', value = '', key = null) => {
        switch (type) {

            case 'text':
                if(value.trim() !== '' && value.trim().length > 0){
                    let filterbytext = list.filter(item => {
                        console.log(item.name);
                        return item.name.trim().toLocaleLowerCase().includes(value.toLocaleLowerCase());
                    });
                    //console.log(list);
                    console.log(filterbytext);
                    setlist(filterbytext);
                    //setcount(count + 5);
                }else{
                    setlist(data);
                }
                break;

            case 'sort':
                console.log('sort by:'+ key);

                if(value === 'desc'){
                    let filterbysort = list.sort((a,b) => a[key] > b[key] ? 1 : -1);
                    //console.log(list);
                    console.log(filterbysort);
                    setlist(filterbysort);
                    //setcount(count + 5);
                }else if (value === 'asc'){
                    let filterbysort = list.sort((a,b) => a[key] < b[key]  ? 1 : -1);
                    //console.log(list);
                    console.log(filterbysort);
                    setlist(filterbysort);
                    //setcount(count + 5);
                }
            break;

            default:
                console.log('seteando list al estado original');
                let unsort = data.sort((a,b) => a['id'] > b['id']  ? 1 : -1);
                setlist(unsort);
                break;
        }
    }

    const sortTable = (key) => {
        if(key === 'status'){
            if(filterByStatus === null){
                setfilterByStatus('desc');
                filterBy('sort', 'desc', key);
            }else if(filterByStatus === 'asc'){
                setfilterByStatus('desc');
                filterBy('sort', 'desc', key);
            }else if(filterByStatus === 'desc'){
                setfilterByStatus('asc');
                filterBy('sort', 'asc', key);
            }
        }
    }

    const changeInputSearch = (value) => {
        setFilterBySearch(value);
        setsearchByText(true);

        setTimeout(() => {
            setsearchByText(false);
            filterBy('text', value);
        }, 500);
    }

    const cleanFilters = () => {
        if(count){
            setlist(data);
            setFilterBySearch('');
            setfilterByStatus(null);
            setsearchByText(false);
            setcount(0);

            filterBy('clear');
        }
    }

    //console.log(list);
    
    return (
        <div className="container py-3">
                <div>
                    <div className="filters bg-light py-3 mb-3 px-3">
                        <form action="">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-lg-2">
                                    <div className="filter-by">
                                        <button type="button" onClick={() => sortTable('status')} className="btn-unstyled font-weight-bold">
                                            Estatus <i className={`ml-3 filter-indicator fa fa-${getFilterClass(filterByStatus)}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input">
                                        <input 
                                            value={filterBySearch}
                                            onChange={(e) => changeInputSearch(e.target.value)}
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Filtrar por nombre" 
                                            aria-label="filter" 
                                            aria-describedby="filter-by-name"
                                        />
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button type="button" onClick={() => cleanFilters()} className="btn btn-primary">
                                        limpiar filtros
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {(searchByText) && 
                        <InlineSpinner />
                    }
                    {(list.length > 0) &&
                        <div>
                            <div className="row row-eq-height">
                                {(list.map((item, key) => {
                                    //let logoshop = '';
                                    
                                    return (
                                        <div key={key} className="col-lg-6 mb-3">
                                            <Link to={`/offline/mis-tiendas/${item.id}`} className="card shadow h-100">
                                                <div className="card-body h-100 py-3">
                                                    <div className="row h-100 justify-content-center align-items-center">
                                                        {(item.logo !== null) &&
                                                            <div className="col-md-6">
                                                                <img
                                                                    src={item.logo}
                                                                    alt="user"
                                                                    className=""
                                                                    height="100"
                                                                />
                                                            </div>
                                                        }
                                                        <div className="col-md-6">
                                                            <h2 className="text-center text-secondary">
                                                                <strong>
                                                                    {item.name}
                                                                </strong>
                                                            </h2>
                                                            <h5 className="text-muted text-center font-weight-normal">
                                                                {item.status}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }))}
                            </div>
                        </div>
                    }
                </div>
            
        </div>
    )
}

export default Table
