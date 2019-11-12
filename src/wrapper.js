// eslint-disable-next-line
const WebsocketWrapper = require('./websocketWrapper');
const GamesWrapper = require('./gamesWrapper');
const UserWrapper = require('./userWrapper');

module.exports = class Wrapper {
    /**
     * Initializes the WebsocketWrapper
     * @param {WebsocketWrapper} wsWrapper
     */
    constructor(wsWrapper) {
        this.wsWrapper = wsWrapper;
        this.games = new GamesWrapper(this.wsWrapper);
        this.user = new UserWrapper(this.wsWrapper);
    }

    /**
     * Returns the Gameswrapper.
     * @return {GamesWrapper}
     */
    get Games() {
        return this.games;
    }

    /**
     * Returns the Gameswrapper.
     * @return {UserWrapper}
     */
    get User() {
        return this.user;
    }
};
