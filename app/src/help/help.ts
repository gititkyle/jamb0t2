const getHelp = async (data: any) => {
    return [
        'Help is on the way! :ambulance:'
    ];
};

/** 
 * API
 */
export default {
    moduleId: 'help',
    command: '!help',
    message: 'Failed to get help!',
    active: true,
    handler: getHelp,
    auth: {
        roles: [] // TODO
    }
}
