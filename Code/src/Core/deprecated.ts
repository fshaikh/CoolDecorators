
import * as utils from "../utils/utils";

const DEFAULT_MESSAGE = "This function will be removed in future versions.";

/**
 * Outputs a warning message when a function is decorated with deprecated decorator
 * @param message - Message to be shown when the function is marked as deprecated
 * @param options - Options object. {url:''}
 */
export function deprecated(message:string=DEFAULT_MESSAGE,options:any={}){
    return(target:any, key:string, propertyDescriptor:PropertyDescriptor) => {
        // Applicable only for functions
        if(!(typeof(target[key] !== 'function'))){
            utils.throwNotApplicableError("Only functions can be marked as deprecated");
        }

        // copy the original function body
        var oldValue = propertyDescriptor.value;
        // build the formatted message to be shown as warning
        var formattedMessage = `DEPRECATION ${target.constructor.name}#${key}: ${message}`;
        if(options.url){
            formattedMessage += `See ${options.url} for more details`;
        }

        // redefine the new wrapped function
        propertyDescriptor.value = function(){
            utils.warn(formattedMessage);
            // invoke the original function being decorated
            oldValue.call(this);
        };

        return propertyDescriptor;
    };
}