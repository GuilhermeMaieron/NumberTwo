export function rmNonNumeric(value: string) {
    // remove valores não numéricos, se tiver uma virgula ou ponto, mantem
    return value.replace(/[^0-9,.]/g, '');
}

export function toFloat(value: string) {
    return parseFloat(String(value).replace(',', '.'));
}

export function toShow(value: string) {
    return String(value).replace('.', ',');
}
