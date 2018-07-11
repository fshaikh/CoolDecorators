/**
 * readonly decorator which can be applied to property/methods to mark
 * them as read only
 * @param target - Target object
 * @param key - Property/Function name being decorated
 * @param propertyDescriptor - PropertyDescriptor for the property/function
 */

export function readonly(
                    target: Object,
                    key:string,
                    propertyDescriptor: PropertyDescriptor): any {
    propertyDescriptor.writable = false;
    return propertyDescriptor;
}

