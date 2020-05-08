import _            from 'lodash';
import fetch        from 'node-fetch';
import * as config  from 'config/conf.json';
import * as convert from './../common/util/convert';

const search = config.giphy.search;
const media  = config.giphy.media;
const key    = process.env.GIPHY_KEY;

async function get (data: any): Promise<string[]> {
    const args  = convert.toArgs(data.message);
    const query = args.join('+');

    try {
        const result   = await fetch(`${search}?api_key=${key}&q=${query}`);
        const json     = await result.json();
        const mediaId  = _.sample(json?.data)?.id;
        const mediaUrl = media.replace('{mediaId}', mediaId);

        return [
            mediaUrl
        ];

    } catch (e) {
        throw Error(api.message);
    }
}

const api = {
    moduleId: 'gif',
    command: '!gif',
    message: 'Failed to get gif!',
    active: true,
    handler: get
};

export default api;
