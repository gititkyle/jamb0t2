async function get (data: any): Promise<string[]> {
    return [
        'Help is on the way! :ambulance:'
    ];
}

/**
 * API
 */
const api = {
    moduleId: 'help',
    command: '!help',
    message: 'Failed to get help!',
    active: true,
    handler: get
};

export default api;
