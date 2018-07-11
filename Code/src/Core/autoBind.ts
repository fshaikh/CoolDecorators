import * as utils from "../utils/utils";
/**
 * Hard binds a function so that this is always referring to the class instance no matter
 * how and where the function is invoked
 * NOTE: Applicable only for class
* @param target - Target object
* @param key - Property/Function name being decorated
* @param propertyDescriptor - PropertyDescriptor for the property/function
*/
 export function autoBind(target:any,key:string,propertyDescriptor:PropertyDescriptor):any{
    // Applicable only for methods
    if(!(typeof target[key] === 'function')){
        utils.throwNotApplicableError("Only class can be marked as autoBind");
    }
    
    // Return a new constructor function
    return function constructor(...args){
        var obj = new target(...args);  
        var prototype =Object.getPrototypeOf(obj);
        var keys =Object.getOwnPropertyNames(prototype);
        
        for(let item in keys){
          if(keys[item] === 'constructor'){
            continue;
          }
          var fn = prototype[keys[item]];
          var bindFn = fn.bind(obj);
          Object.defineProperty(prototype,keys[item],{
            value:bindFn 
          });
          
        }
        return obj; 
    } 
 }


 // Tests:
 // 2. it should throw error when invoked for property
 // 3. it should throw error when invoked for parameter
 // 4. it should not throw error when invoked for function