import _                from 'lodash';
import fetch            from 'node-fetch';
import * as config      from './../../../config/conf.json';
import * as convert     from './../common/util/convert';
import * as roles       from './../common/roles/roles';
import * as log4jambot2 from './../common/util/logger';
import { IRouteConfig } from './../common/util/router-interface';

const search = config.giphy.search;
const media  = config.giphy.media;
const key    = process.env.GIPHY_KEY;
const logger = log4jambot2.logger('gif');

async function get (routeConfig: IRouteConfig): Promise<string[]> {
    logger.debug('BEGIN gif');

    const { data } = routeConfig;
    const args  = convert.toArgs(data.message);
    const query = args.join('+');

    try {
        const result  = await fetch(`${search}?api_key=${key}&q=${query}`);
        const json    = await result.json();
        const mediaId = _.sample(json?.data)?.id;
        const message = mediaId ? media.replace('{mediaId}', mediaId) : api.message;

        return [
            message
        ];

    } catch (e) {
        logger.debug(e);
        throw Error(api.message);
    }
}

const api = {
    moduleId: 'gif',
    command: '!gif',
    message: 'Failed to get gif!',
    active: true,
    handler: get,
    auth: {
        roles: [
            roles.ROLE_IDS.Host,
            roles.ROLE_IDS.CoHost,
            roles.ROLE_IDS.Manager,
            roles.ROLE_IDS.Bouncer,
            roles.ROLE_IDS.ResidentDJ
        ]
    }
};

export default api;
