export default function log(target: any, key: string, propDesc: PropertyDescriptor): any {
    const oldValue = propDesc.value;
    propDesc.value = function(...args) {
        console.log(`${key} called`);
        oldValue.call(this,...args);
    };

    return propDesc;
}