import * as modules from './../modules/modules';

export function isAuthorized (moduleId: string, roleId: number): boolean {
    const module   = modules.getModuleById(moduleId);
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
