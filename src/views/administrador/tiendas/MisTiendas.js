import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import InlineSpinner from '../../spinner/InlineSpinner';
import axios from 'axios'

function MisTiendas() {

    const [loading, setloading]                 = useState(true);
    const [search,  setSearch]                  = useState(true);
    const [sending, setsending]                 = useState(false);

    const [data,    setData]                    = useState([]);
    const [list,    setlist]                    = useState([]);
    const [errormessage, seterrormessage]       = useState('');
    const [successmessage, setsuccessmessage]   = useState('');

    const [filterBySearch, setFilterBySearch]   = useState('');
    const [filterByStatus, setfilterByStatus]   = useState(null);
    const [count, setcount]   = useState(0);

    const [searchByText,    setsearchByText]   = useState(false);

    let url = '/setting/seller/shop/all';
    let urlsearch = '/setting/seller/shop/name/like/';

    const getData = () => {
        if(search){
            setSearch(false);
            axios.get(url)
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data.rsShopAll);
                setlist(res.data.data.rsShopAll);
                setloading(false);
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    useEffect(() => {
        if(loading){
            getData();
        }
    });

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

    const searchShop = (text) => {
        axios.get(urlsearch+text).then((res) => {
            let newlist = res.data.data.rsShopName;

            setlist(newlist);
            setsearchByText(false);
            filterBy('sort', filterByStatus, 'status');

            console.log(newlist);
        }).catch((err) => {
            console.log(err);
        })
    }

    const filterBy = (type = '', value = '', key = null) => {
        switch (type) {
            case 'search':
                if(value.trim() !== '' && value.trim().length > 0){
                    searchShop(value.trim());
                }else{
                    setsearchByText(false);
                    setlist(data);
                }
                break;


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
                let filterbysort = [];

                if(value === 'desc'){

                    if(key === 'status'){
                        console.log('filter by status');
                        filterbysort = list.sort((a,b) => a.Status.name > b.Status.name ? 1 : -1);
                    }else{
                        filterbysort = list.sort((a,b) => a[key] > b[key] ? 1 : -1);
                    }
                    //console.log(list);
                    console.log(filterbysort);
                    setlist(filterbysort);
                    //setcount(count + 5);
                }else if (value === 'asc'){
                    if(key === 'status'){
                        console.log('filter by status');
                        filterbysort = list.sort((a,b) => a.Status.name < b.Status.name ? 1 : -1);
                    }else{
                        filterbysort = list.sort((a,b) => a[key] < b[key] ? 1 : -1);
                    }
                    //console.log(list);
                    console.log(filterbysort);
                    setlist(filterbysort);
                    //setcount(count + 5);
                }
            break;

            default:
                console.log('seteando list al estado original');
                let unsort = data.sort((a,b) => a['id'] < b['id']  ? 1 : -1);
                console.log(unsort);
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
            //setsearchByText(false);
            filterBy('search', value);
            //filterBy('text', value);
        }, 500);
    }

    const cleanFilters = () => {
        setlist(data);
        setFilterBySearch('');
        setfilterByStatus(null);
        setsearchByText(false);
        //setcount(0);

        filterBy('clear');
    }

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Mis tiendas</h1>
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
                                let logoshop = '';

                                if(item.logo !== null){
                                    logoshop = item.logo.data.reduce(
                                        function (data, byte) {
                                            return data + String.fromCharCode(byte);
                                        },
                                        ''
                                    );
                                }
                                
                                return (
                                    <div key={key} className="col-lg-6 mb-4">
                                        <Link to={`/admin/shop/${item.id}`} className="card shadow h-100">
                                            <div className="card-body h-100 py-3">
                                                <div className="row h-100 justify-content-center align-items-center">
                                                    {(item.logo !== null) &&
                                                        <div className="col-md-6">
                                                            <img
                                                                src={`data:image/png;base64,${logoshop}`}
                                                                alt="user"
                                                                className=""
                                                                height="100"
                                                            />
                                                        </div>
                                                    }
                                                    <div className="col-md-auto">
                                                        <h2 className="text-center text-secondary">
                                                            <strong>
                                                                {item.name}
                                                            </strong>
                                                        </h2>
                                                        <h5 className="text-muted text-center font-weight-normal">
                                                            {item.Status.name}
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
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Mis tiendas</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default MisTiendas
