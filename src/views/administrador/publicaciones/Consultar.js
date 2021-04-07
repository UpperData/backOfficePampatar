import React from 'react'

function Consultar() {

    /*

    {(2 === 3) &&
        <Card>
            <CardBody className="border-bottom">
                <CardTitle className="mb-0 font-weight-bold">
                    Seleccionar tienda:
                </CardTitle>
            </CardBody>
            <CardBody>
                <ShopWithContractsSelect value={shop} onChange={(value) => getBids(value)} />
            </CardBody>
        </Card>
    }

    const getBids = (value) => {
        setshop(value);
        setsearchBids(true);

        let urlget = `/SeTtiNG/BiD/get/BySHOp/${value.value}`;
        axios.get(urlget).then((res) => {
            console.log(res.data);

            setFilterBySearch("");
            setsearchByText("");
            setfilterByType(null);
            setbidlist(res.data);
            setdata(res.data);

            setsearchBids(false);

        }).catch((err) => {
            console.error(err);

            setsearchBids(false);
        });
    }
    */
   
    return (
        <div>
            
        </div>
    )
}

export default Consultar
