import _            from 'lodash';
import * as modules from './../modules/modules';

export function isAuthorized (moduleId: string, roleId?: string): boolean {
    const module   = modules.getModule(moduleId);
    let authorized = false;

    /**
     * If module hasn't defined auth allow anyone to use it
     */
    if(!module?.auth) {
        return true;
    }

    if(module.auth.roles?.includes(roleId)) {
        authorized = true;
    }

    return authorized;
}
