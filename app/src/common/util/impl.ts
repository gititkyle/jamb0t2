import * as log4jambot from './logger';

const logger = log4jambot.logger('impl');

export function handleErrorResult (result: any): void {
    if(!Array.isArray(result)) {
        logger.debug(`Error result: ${result}`);
        throw TypeError(`Invalid type ${typeof result}. Expected string[]`);
    }
}
