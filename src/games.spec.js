const { describe, it, before } = require('mocha');
const { expect } = require('chai');

const { Wrapper, WebsocketWrapper } = require('./index');

describe('Non-auth-required', () => {
    it('Invoke fetchGames', (done) => {
        const ws = new WebsocketWrapper({ url: 'ws://localhost:8100/' });
        ws.initialize().then(() => {
            const wrapper = new Wrapper(ws);
            wrapper.Games.fetchGames().then((games) => {
                // eslint-disable-next-line
                expect(games, 'GamesObject is undefined.').to.not.be.undefined;
                done();
            });
        });
    });
});

describe('Auth-required', () => {
    let ws;
    let wrapper;
    before((done) => {
        ws = new WebsocketWrapper({ url: 'ws://localhost:8100' });
        ws.initialize().then(() => {
            wrapper = new Wrapper(ws);
            done();
        });
    });
    it('Invoke Login', ((done) => {
        wrapper.Users.login({
            username: 'testuser-one',
            password: 'testpassword',
        }).then(done);
    }));
    it('Invoke createGame', ((done) => {
        wrapper.Games.createGame({
            title: 'some-title',
            password: 'some-password',
            deckids: ['DKV01'],
            maxplayers: 4,
            maxroundtime: 60,
            pointstowin: 8,
        }).then(done);
    }));
    it('Invoke start', ((done) => {
        wrapper.Games.start().catch(done);
    }));
});
