process.env['NODE_PATH'] = '.:./app';

import _                from 'lodash';
import PlugAPI          from 'plugapi';
import * as config      from './../config/conf.json';
import * as impl        from './src/common/util/impl';
import * as log4jambot2 from './src/common/util/logger';
import * as router      from './src/common/util/router';
import * as auth        from './src/common/auth/auth';
import twitter          from './src/twitter/twitter';
import track            from './src/common/mongo/track/track';
import mongo            from './src/common/mongo/connect';

/** Configure logging */
log4jambot2.configure('log4js.json');

/** Instantiate api */
const jambot2 = new PlugAPI({
    email: process.env.JAMBOT2_EMAIL,
    password: process.env.JAMBOT2_PASSWORD
});

const logger  = log4jambot2.logger('app');
const connect = (room: string=config.plug.room) => jambot2.connect(room);

jambot2.on(PlugAPI.events.CHAT, async data => {
    logger.debug(`Message received: @${data.from} ${data.message}`);

    if(/^!\w+/.test(data.message)) {
        const start = Date.now();
        const media = jambot2.getMedia();

        try {
            const messages = await router.route({data, media});

            /** Handle errors */
            impl.handleErrorResult(messages);

            /** Send messages */
            _.each(messages, message => jambot2.sendChat(message, 500));
            logger.debug(`Message SUCCESS after ${Date.now()-start}ms`);

        } catch (e) {
            jambot2.sendChat('That didn\'t work :frowning:');
            logger.debug(`Message FAILURE after ${Date.now()-start}ms ${e}`);
        }
    }
});

jambot2.on(PlugAPI.events.ADVANCE, async data => {
    if(!data.currentDJ) {
        return;
    }

    logger.debug(`Now playing: @${data.currentDJ.username} is spinning ${data.media.author} - ${data.media.title}`);

    // @ts-ignore
    jambot2.woot();

    /**
     * Invoke twitter handler only if currentDJ is authorized
     */
    if(auth.isAuthorized(twitter.moduleId, data.currentDJ.role)) {
        twitter.handler(data);
    }

    /**
     * Invoke tracks handler only if currentDJ is authorized
     */
    if(auth.isAuthorized(track.moduleId, data.currentDJ.role)) {
        track.handler(data);
    }
});

jambot2.on('error', connect);
jambot2.on('close', connect);
/** Fire up jambot and mongo */
setImmediate(connect);
setImmediate(async () => {
    try {
        await mongo();
    } catch (e) {
        logger.warn(`Mongo connection failed: ${e}`);
    }
});
