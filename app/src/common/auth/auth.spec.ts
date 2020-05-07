import { expect } from 'chai';
import * as auth from './auth';

describe('auth', () => {
    it('should expose api', () => {
        expect(auth.isAuthorized).to.not.be.undefined;
    });
});
