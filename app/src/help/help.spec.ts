import chai       from 'chai';
import sinonChai  from 'sinon-chai';
import help       from './help';

chai.use(sinonChai);

const expect = chai.expect;

describe('help', () => {

    describe('on import', () => {
        it('should expose api', () => {
            expect(help).to.deep.equal({
                moduleId: 'help',
                command: '!help',
                message: 'Failed to get help!',
                active: true,
                handler: help.handler
            });
        });
    });

    describe('on invoking handler', () => {
        let result;

        beforeEach(async () => {
            result = await help.handler({});
        });

        it('should return result', () => {
            expect(result).to.deep.equal([
                'Help is on the way! :ambulance:'
            ]);
        });
    })
})
