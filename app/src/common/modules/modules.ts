import * as convert from './../util/convert';

/** import features */
import gif  from './../../gif/gif';
import help from './../../help/help';

const modules = {
    [help.moduleId]: help,
    [gif.moduleId]: gif
};

export function getModuleId (message: string): string {
    const moduleId = convert.toModuleId(message);

    if(modules[moduleId]) {
        return moduleId;
    }
}

export function getModule (moduleId: string): any {
    return modules[moduleId];
}

export function isActive (moduleId: string): boolean {
    return modules[moduleId]?.active;
}
