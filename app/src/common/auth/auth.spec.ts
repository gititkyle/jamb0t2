import chai         from 'chai';
import sinon        from 'sinon';
import sinonChai    from 'sinon-chai';
import * as auth    from './auth';
import * as modules from './../modules/modules';

chai.use(sinonChai);

const expect = chai.expect;

describe('auth', () => {

    describe('on import', () => {
        it('should expose api', () => {
            expect(auth.isAuthorized).to.be.a('function');
        });
    });

    describe('on isAuthorized()', () => {
        let result;
        let module;
        let getModuleStub;

        afterEach(() => {
            getModuleStub.restore();
        });

        describe('with auth undefined on the module', () => {

            beforeEach(() => {
                module = {
                    id: 'some-id'
                };

                getModuleStub = sinon.stub(modules, 'getModule').returns(module);
                result = auth.isAuthorized(module.id);
            });

            it('should return true', () => {
                expect(getModuleStub).to.have.been.calledWith(module.id);
                expect(result).to.equal(true);
            });
        });

        describe('with auth defined on the module', () => {
            const roleId = 'some-id';

            beforeEach(() => {
                module = {
                    id: 'some-id',
                    auth: {
                        roles: [roleId]
                    }
                };

                getModuleStub = sinon.stub(modules, 'getModule').returns(module);
            });

            describe('with a user authorized to use the module', () => {
                beforeEach(() => {
                    result = auth.isAuthorized(module.id, roleId);
                });

                it('should return true', () => {
                    expect(getModuleStub).to.have.been.calledWith(module.id);
                    expect(result).to.equal(true);
                });
            });

            describe('with a user not authorized to use the module', () => {
                const otherRoleId = 'some-other-id';

                beforeEach(() => {
                    result = auth.isAuthorized(module.id, otherRoleId);
                });

                it('should return false', () => {
                    expect(getModuleStub).to.have.been.calledWith(module.id);
                    expect(result).to.equal(false);
                });
            });
        });
    });
});
