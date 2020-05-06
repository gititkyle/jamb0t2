/** import modules */
import help from 'app/src/help/help';

const modules = {
    [help.moduleId]: help
};

export function getModuleId (message: string=''): string {
    const moduleId = message.match(/(?<=!)[\w]*/)[0];

    if(modules[moduleId]) {
        return moduleId;
    }
}

export function getModule (moduleId: string=''): any {
    return modules[moduleId];
}

export function isActive (moduleId: string=''): boolean {
    return modules[moduleId]?.active;
}
