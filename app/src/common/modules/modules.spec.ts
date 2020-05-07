import chai         from 'chai';
import * as modules from './modules';

const expect = chai.expect;

describe('modules', () => {

    describe('on import', () => {
        it('should expose api', () => {
            expect(modules.getModuleId).to.be.a('function');
            expect(modules.getModule).to.be.a('function');
            expect(modules.isActive).to.be.a('function');
        });
    });

    describe('on getModuleId()', () => {
        let result;
        let moduleId;

        describe('with a valid moduleId passed in message', () => {
            beforeEach(() => {
                moduleId = 'help';
                result = modules.getModuleId('!help');
            });

            it('should return the moduleId', () => {
                expect(result).to.equal(moduleId);
            });
        });

        describe('with an invalid moduleId passed in message', () => {
            beforeEach(() => {
                moduleId = undefined;
                result = modules.getModuleId('!some-invalid-moduleId');
            });

            it('should return undefined', () => {
                expect(result).to.equal(moduleId);
            });
        });
    });

    describe('on getModule()', () => {
        let moduleId;
        let result;

        describe('with a valid moduleId passed', () => {
            beforeEach(() => {
                moduleId = 'help';
                result = modules.getModule(moduleId);
            });

            it('should return the module', () => {
                expect(result).to.be.a('object');
            });
        });

        describe('with an invalid moduleId passed', () => {
            beforeEach(() => {
                moduleId = 'some-invalid-moduleId';
                result = modules.getModule(moduleId);
            });

            it('should return undefined', () => {
                expect(result).to.equal(undefined);
            });
        });
    });

    describe('on isActive()', () => {
        let moduleId;
        let result;

        describe('with a valid moduleId passed', () => {
            beforeEach(() => {
                moduleId = 'help';
                result = modules.isActive(moduleId);
            });

            it('should return the modules active boolean', () => {
                expect(result).to.be.a('boolean');
            });
        });

        describe('with an invalid moduleId passed', () => {
            beforeEach(() => {
                moduleId = 'some-invalid-moduleId';
                result = modules.isActive(moduleId);
            });

            it('should return undefined', () => {
                expect(result).to.equal(undefined);
            });
        });
    });
});
