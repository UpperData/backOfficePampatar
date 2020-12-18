export const moneyFormatter = (amount) => {
    const peso = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    })

    return peso.format(amount);
}