// eslint-disable-next-line
const WebsocketWrapper = require('./websocketWrapper');

module.exports = class GamesWrapper {
    /**
     * @param {WebsocketWrapper} wsWrapper
     */
    constructor(wsWrapper) {
        this.wsWrapper = wsWrapper;
    }

    /**
     * Fetch all games.
     * @return {Promise} returns a promise with all games.
     */
    fetchGames() {
        return this.wsWrapper.sendCommand({ command: 'fetchgames' });
    }

    /**
     * Create a game.
     * @param {Object} gameObject
     * @param {String} gameObject.gametitle
     * @param {String} gameObject.password
     * @param {String[]} gameObject.deckids
     * @param {number} gameObject.maxplayers
     * @param {number} gameObject.maxroundtime
     * @param {number} gameObject.pointstowin
     * @return {Promise<Object>}
     */
    createGame(gameObject) {
        return this.wsWrapper.sendCommand({
            command: 'creategame',
            params: gameObject,
        });
    }

    /**
     * Join a game.
     * @param {String} gameid
     * @return {Promise<Object>}
     */
    join(gameid) {
        return this.wsWrapper.sendCommand({
            command: 'join',
            params: { gameid },
        });
    }

    /**
     * Formerly known as 'fetchcards'.
     * Fetch the players' cards.
     * @return {Promise<Object>}
     */
    fetchHand() {
        return this.wsWrapper.sendCommand({ command: 'fetchcards' });
    }

    /**
     * @return {Promise<Object>}
     */
    start() {
        return this.wsWrapper.sendCommand({ command: 'start' });
    }

    /**
     * @param {String} carduuid
     * @return {Promise<Object>}
     */
    playCard(carduuid) {
        return this.wsWrapper.sendCommand({
            command: 'playcard',
            params: { carduuid },
        });
    }

    /**
     * @return {Promise<Object>}
     */
    fetchAllPlayedCards() {
        return this.wsWrapper.sendCommand({ command: 'fetchallplayedcards' });
    }

    /**
     * @param {String} carduuid
     * @return {Promise<Object>}
     */
    pickCard(carduuid) {
        return this.wsWrapper.sendCommand({
            command: 'fetchallplayedcards',
            params: { carduuid },
        });
    }
};
