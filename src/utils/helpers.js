export const moneyFormatter = (amount) => {
    const peso = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    })

    return peso.format(amount);
}

export const isBase64 = (str) => {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

export const getBase64Img = (data) => {
    let imagen = "";
    let type = "";
    
    if(Array.isArray(data.data)){
        imagen = data.data.reduce(
            function (data, byte) {
                return data + String.fromCharCode(byte);
            },
            ''
        );

        let separator = imagen.split(",");
        type    = separator[0];
        imagen  = separator[separator.length - 1];
    }

    return {type: type, url: imagen};
}