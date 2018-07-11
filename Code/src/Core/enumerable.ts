/**
 * Decorator which can be applied to functions to mark the function
 * as enumerable i.e for..in will list the decorated function
 * NOTE: instance properties are already enumerable, so this is only useful for methods.
 * @param target - Target object
 * @param key - Property/Function name being decorated
 * @param propertyDescriptor - PropertyDescriptor for the property/function
 */
export function enumerable(
                              target:Object,
                              key:string,
                              propertyDescriptor:PropertyDescriptor):any{
    propertyDescriptor.enumerable = true;
    return propertyDescriptor;
}