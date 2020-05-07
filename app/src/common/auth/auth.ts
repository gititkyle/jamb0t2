import _            from 'lodash';
import * as modules from './../modules/modules';

export function isAuthorized (moduleId: string, roleId?: string): boolean {
    let   authorized = false;
    const module = modules.getModule(moduleId);

    /**
     * If module hasn't defined auth allow anyone to use it
     */
    if(!module.auth) {
        return true;
    }

    if(module.auth.roles?.includes(roleId)) {
        authorized = true;
    }

    return authorized;
}
