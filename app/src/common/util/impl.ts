export function handleErrorResult (result: any) {
    if(!Array.isArray(result)) {
        throw TypeError(`Invalid type ${typeof result}. Expected string[]`);
    }
}
