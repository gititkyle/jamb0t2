import util             from 'util';
import Twitter          from 'twitter';
import * as config      from 'config/conf.json';
import * as log4jambot2 from './../common/util/logger';

const logger = log4jambot2.logger('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

async function tweet (data: any) {
    const status = `${data.currentDJ.username} is spinning ${data.media?.author} - ${data.media?.title}. Join us @ https://plug.dj/justjambands!`;

    try {
        await client.post(config.twitter.tweet, {status});
    } catch (e) {
        logger.debug(`Twitter ${util.inspect(e)}`);
    }
}

/**
 * API
 */
const api = {
    tweet
};

export default api;
