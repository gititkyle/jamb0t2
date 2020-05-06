import * as log4js from 'log4js';

/**
 * Configure log4js
 * @param {string} [filename] - optional log4js config filename.  Defaults to log4js.json
 * @returns {log4js.Log4js}
 */
export const configure = (filename: string='log4js.json'): log4js.Log4js => log4js.configure(filename);

/**
 * Sets up connect logger
 * @param {string} name - name of the logger. Defaults to 'connect'
 * @param {object} [options] - options object to pass to log4js.  Defaults to {}
 * @returns {log4js.Logger}
 */
export const connectLogger = (name: string='connect', options: any={}): any => log4js.connectLogger(log4js.getLogger(name), options);

/**
 * Sets up logger for the given name
 * @param {string} name - name of the logger (e.g. app, help, etc.). Defaults to 'default'
 * @returns {log4js.Logger}
 */
export const logger = (name: string='default'): log4js.Logger => log4js.getLogger(name);
