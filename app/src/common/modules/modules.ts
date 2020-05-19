import * as convert from './../util/convert';

/** import features (modules) */
import gif     from './../../gif/gif';
import help    from './../../help/help';
import last    from './../../last/last';
import twitter from './../../twitter/twitter';

const modules = {
    [help.moduleId]: help,
    [gif.moduleId]: gif,
    [twitter.moduleId]: twitter,
    [last.moduleId]: last
};

export function getModuleId (message: string): string {
    const moduleId = convert.toModuleId(message);

    if(modules[moduleId]) {
        return moduleId;
    }
}

export function getModuleById (moduleId: string): any {
    return modules[moduleId];
}

export function isActive (moduleId: string): boolean {
    return modules[moduleId]?.active;
}
