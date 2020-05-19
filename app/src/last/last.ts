import moment          from 'moment';
import * as roles      from './../common/roles/roles';
import * as log4jambot from './../common/util/logger';
import Track           from '../common/mongo/track/track-model';

const logger = log4jambot.logger('last');

async function handler ({data, media}): Promise<any> {
    logger.debug(`BEGIN last`);

    try {
        const date = new Date(Date.now() - (media.duration * 1000));
        const track = await Track.findOne({mediaId: media.id, date: { $lt: date } }).sort({date: -1});
        logger.debug('END last SUCCESS');
        
        if(track) {
            return [
                `${track.title} was last played ${moment(track.date, 'YYYYMMDD').fromNow()} by @${track.user}`
            ];
        }

        return [ 
            `This is the first time ${media.title} has been played!` 
        ];

    } catch (e) {
        logger.debug(`End last FAILURE: ${e}`);
    }
}

const api = {
    moduleId: 'last',
    command: '!last',
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
