import { IRouteConfig } from './router-interface';
import * as log4jambot2 from './../../common/util/logger';
import * as auth        from './../../common/auth/auth';
import * as modules     from './../../common/modules/modules';

const logger = log4jambot2.logger('router');

export async function route (routeConfig: IRouteConfig): Promise<string[]> {
    const { data, media } = routeConfig;
    const roleId          = data.from.role;
    const moduleId        = modules.getModuleId(data.message);
    const module          = modules.getModuleById(moduleId);

    if (
        module &&
        modules.isActive(moduleId) &&
        auth.isAuthorized(moduleId, roleId)
    ) {
        try {
            return await module.handler({data, media});
        } catch (e) {
            return e;
        }
    } else {
        logger.debug(`${moduleId} not found`);
    }
}
