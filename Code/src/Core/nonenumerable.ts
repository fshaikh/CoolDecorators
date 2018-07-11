/**
 * decorator which can be applied to property/methods to mark the property/function
 * as not enumerable i.e calling Object.keys or for..in will not list the decorated property
 * Need not be applied on the functions as they are by default not enumerable since 
 * functions are defined on the object prototype
 * @param target - Target object
 * @param key - Property/Function name being decorated
 * @param propertyDescriptor - PropertyDescriptor for the property/function
 */
export function nonenumerable(
                        target: Object,
                        key: string,
                        propertyDescriptor: PropertyDescriptor):any{
    propertyDescriptor.enumerable = false;
    return propertyDescriptor;
}