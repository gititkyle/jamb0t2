process.env['NODE_PATH'] = '.:./app';

import _                from 'lodash';
import PlugApi          from 'plugapi';
import * as config      from './../config/conf.json';
import * as impl        from './src/common/util/impl';
import * as log4jambot2 from './src/common/util/logger';
import * as router      from './src/common/util/router';
import * as roles       from './src/common/roles/roles';
import twitter          from './src/twitter/twitter';

/** Configure logging */
log4jambot2.configure('log4js.json');

/** Instantiate api */
const jambot2 = new PlugApi({
    email: process.env.JAMBOT2_EMAIL,
    password: process.env.JAMBOT2_PASSWORD
});

const logger  = log4jambot2.logger('app');
const connect = (room: string=config.plug.room) => jambot2.connect(room);

jambot2.on(PlugApi.events.CHAT, async data => {
    logger.debug(`Message received: @${data.from} ${data.message}`);

    if(/^!\w+/.test(data.message)) {
        const start = Date.now();

        try {
            const messages = await router.route({data});

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

jambot2.on(PlugApi.events.ADVANCE, async data => {
    if(!data.currentDJ) {
        return;
    }

    logger.debug(`Now playing: @${data.currentDJ.username} is spinning ${data.media.author} - ${data.media.title}`);

    setTimeout(() => {
        // @ts-ignore
        jambot2.woot();
    }, 2000);

    /**
     * Invoke twitter handler for bouncers and above only
     */
    if(data.currentDJ.role >= roles.ROLE_IDS.Bouncer) {
        twitter.tweet(data);
    }
});

jambot2.on('error', connect);
jambot2.on('close', connect);
// @ts-ignore
setImmediate(connect);
