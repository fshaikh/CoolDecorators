/**
 * decorator which can be applied to property/methods to mark the property/function
 * as not configurable i.e property/function cannot be deleted or modified via
 * Object.defineProperty
 * @param target - Target object
 * @param key - Property/Function name being decorated
 * @param propertyDescriptor - PropertyDescriptor for the property/function
 */
export function nonconfigurable(
    target: Object,
    key: string,
    propertyDescriptor: PropertyDescriptor): any {
    propertyDescriptor.configurable = false;
    return propertyDescriptor;
}