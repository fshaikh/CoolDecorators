import {throwNotApplicableError} from "../utils/utils";

/**
 * Prevents a property initializer from running until the decorated property is actually looked up.
 *  Useful to prevent excess allocations that might otherwise not be used.
 * @param target - Target object
 * @param key - Property name being decorated
 * @param propertyDescriptor - PropertyDescriptor for the property
 * import { lazyInitialize } from 'core-decorators';

function createHugeBuffer() {
  console.log('huge buffer created');
  return new Array(1000000);
}

class Editor {
  @lazyInitialize
  hugeBuffer = createHugeBuffer();
}

var editor = new Editor();
// createHugeBuffer() has not been called yet

editor.hugeBuffer;
// logs 'huge buffer created', now it has been called

editor.hugeBuffer;
// already initialized and equals our buffer, so
// createHugeBuffer() is not called again
 */
export function lazyInitialize(target:any, key:string, propDesc:any) {
    // Only applicable for Class Properties
    // When a class property is decorated, the PropertyDescriptor contains
    // "initializer" property instead of value.
    const { enumerable, configurable, initializer } = propDesc; 

    if(!initializer){
        throw throwNotApplicableError("Only properties can be marked as lazyInitialize");
    }
    
    // Return a new Property Descriptor so that the initial invocation is avoided i.e when calling new
    return {
       configurable : configurable,
       enumerable: enumerable,
       // Create a getter so that we can control the execution of the function
       get: function(){
           // execute the initializer to fetch the value
           var propValue = initializer.call(this);
           // Redefine the property so that it has the value bound to the already computed value
           Object.defineProperty(this,key,{
              configurable: configurable,
              enumerable: enumerable,
              writable:true,
              value:propValue 
           });
          return propValue;
       } 
    };
    
  }

  // Tests:
  // it("should throw error for function target")
  // it("should throw error for class target")
  // it("should throw error for parameter target")
  // it("should not set value when calling new")
  // it("should set value when invoking property")
  // it("should set value when invoking property when function takes parameters")
  // it("should not invoke the function when invoking second time onwards")
  // it("should return value when setting a literal")