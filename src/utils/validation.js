import { default as isIp } from 'is-ip';

const min = (value, minValue) => {
    return value > minValue;
};

const max = (value, maxValue) => {
    return value < maxValue;
};

const required = (value) => {
    return value.toString().trim().length > 0;
};

const isValidIp = (value) => {
    return isIp.v4(value);
};

export default validateForm = (formData) => {
    const check = {};

    Object.values(formData).forEach((input, key) => {
        const inputName = Object.keys(formData)[key];
        const inputValue = input.value;
        const inputRules = input.rules
        
        inputRules.forEach((rule) => {
            const ruleName = Object.keys(rule)[0];
            const ruleValue = Object.values(rule)[0];
            const error = !eval(ruleName)(inputValue, ruleValue);

            if (error && check[inputName] === undefined) {
                check[inputName] = [];
            }

            if (error) {
                check[inputName].push(ruleName);
            }
        });
    });

    return check;
};
