export function warn(message:string){
    console.warn(message);
}

export function throwNotApplicableError(message:string){
    throw new SyntaxError(message);
}