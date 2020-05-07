import * as modules from './../modules/modules';

export function isAuthorized (moduleId: string='') {
    const module = modules.getModule(moduleId);

    if(!module.auth) {
        return true;
    }
}
