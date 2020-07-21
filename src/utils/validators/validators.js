export const required = value => {
    if(value) {
        return;
    }
    return 'Field is required';
}

export const maxLength30 = value => {
    if(value.length <= 30) {
        return
    }
    return 'Max length is 30 symbols'
}

export const maxLengthCreator = maxLength => (value) => {
    if (value.length <= maxLength) {
        return
    }
    return `Max length is ${maxLength} symbols`
}