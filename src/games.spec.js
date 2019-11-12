const { describe, it } = require('mocha');
const { expect } = require('chai');

const { Wrapper, WebsocketWrapper } = require('./index');

describe('Game Tests', () => {
    it('Invoke fetchGames', () => {
        const ws = new WebsocketWrapper({ url: 'ws://localhost:8100/' });
        ws.initialize().then(() => {
            const wrapper = new Wrapper();
            wrapper.Games.fetchGames().then((games) => {
                // eslint-disable-next-line
                expect(games, 'GamesObject is undefined.').to.not.be.undefined;
            });
        });
    });
});
