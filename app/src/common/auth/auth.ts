import * as modules from 'app/src/common/modules/modules';

export function isAuthorized (moduleId: string='') {
    const module = modules.getModule(moduleId);

    if(!module.auth) {
        return true;
    }
}
