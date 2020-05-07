import * as log4jambot2 from './../../common/util/logger';
import * as auth        from './../../common/auth/auth';
import * as modules     from './../../common/modules/modules';

const logger = log4jambot2.logger('router');

export async function route (config: any): Promise<string[]> {
    const { data } = config;
    const moduleId = modules.getModuleId(data.message);
    const module   = modules.getModule(moduleId);

    if (
        module &&
        modules.isActive(moduleId) &&
        auth.isAuthorized(moduleId)
    ) {
        try {
            return await module.handler(data);
        } catch (e) {
            return e;
        }
    } else {
        logger.debug(`${moduleId} not found`);
    }
}
