import * as roles      from '../common/roles/roles';
import * as log4jambot from '../common/util/logger';
import Track           from '../common/mongo/track/track-model';

const logger = log4jambot.logger('tracks');

async function handler (data: any): Promise<void> {
    logger.debug(`BEGIN tracks`);

    const track = new Track({
        mediaId: data.media.id,
        artist: data.media.author,
        title: data.media.title,
        user: data.currentDJ.username,
        date: Date.now()
    });

    try {
        await track.save();
        logger.debug('END tracks SUCCESS');
    } catch (e) {
        logger.debug(`END tracks FAILURE ${e}`);
    }
}

const api = {
    moduleId: 'tracks',
    active: true,
    handler,
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
