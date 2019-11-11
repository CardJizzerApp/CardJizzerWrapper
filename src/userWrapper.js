// eslint-disable-next-line
const { WebsocketWrapper } = require('./websocketWrapper');

exports.UserWrapper = class {
    /**
     * @param {WebsocketWrapper} wsWrapper
     */
    constructor(wsWrapper) {
        this.wsWrapper = wsWrapper;
    }

    /**
     * Logs the user in
     * @param {Object} options
     * @param {String} options.username
     * @param {Object} options.password
     * @param {Object} options.idToken
     * @return {Promise<Object>}
     */
    login(options) {
        const loginData = options.idToken === undefined ? {
            username: options.username,
            password: options.password,
        } : {
            idToken: options.idToken,
        };
        return this.wsWrapper.sendCommand({
            command: 'login',
            params: {
                loginData,
            },
        });
    }

    /**
     * Register
     * @param {Object} options
     * @param {String} options.username username of the user (non-google)
     * @param {String} options.password password of the user (non-google)
     * @param {String} options.idToken Google OAuth idToken
     * @return {Promise<Object>}
     */
    register(options) {
        return this.wsWrapper.sendCommand({
            command: 'register',
            params: options,
        });
    }
};
