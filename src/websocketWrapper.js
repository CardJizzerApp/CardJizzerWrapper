const WebSocket = require('ws');
// eslint-disable-next-line
const {CommandObject} = require('./commandObject');

module.exports = class WebsocketWrapper {
    /**
     * Initializes the websocket and the commandStack
     * @param {Object} options
     * @param {String} options.url CardJizzerBackend URL
     */
    constructor(options) {
        this.nextQueueId = 0;
        this.commandStack = [];
        this.options = options;
        this.websocket = 0;
    }

    /**
     * Initializes the websocket with options given in constructor.
     */
    initialize() {
        return new Promise((resolve, reject) => {
            this.websocket = new WebSocket(this.options.url);
            this.websocket.onmessage = (event) => this.handleMessages(event);
            const handle = setInterval(() => {
                if (this.websocket.readyState !== 0) {
                    clearTimeout(handle);
                    resolve(this);
                }
            }, 50);
            setTimeout(reject, 10 * 1000);
        });
    }

    /**
     * Sends a command to the backend and returns a Promise with the response.
     * @param {CommandObject} commandObject the CommandObject
     * @return {Promise<Object>} the response
     */
    sendCommand(commandObject) {
        return new Promise((resolve, reject) => {
            const queueId = this.appendCommandToStackWithQueueId(commandObject);
            // eslint-disable-next-line
            commandObject.queueId = queueId;
            this.websocket.send(JSON.stringify(commandObject));
            this.listenForResponse(resolve, reject, queueId);
        });
    }

    /**
     * Appends a commandObject to the commandStack.
     * @param {CommandObject} commandObject
     * @return {number} queueId
     */
    appendCommandToStackWithQueueId(commandObject) {
        const object = JSON.parse(JSON.stringify(commandObject));
        object.queueId = this.nextQueueId;
        this.nextQueueId += 1;
        this.commandStack.push(object);
        return object.queueId;
    }

    /**
     * @param {()} resolve
     * @param {()} reject
     * @param {number} queueId
     * Waits until a response comes in with the given queueId
     */
    listenForResponse(resolve, reject, queueId) {
        const handle = setInterval(() => {
            const responseString = this.readResponse(queueId);
            if (responseString !== undefined) {
                const response = JSON.parse(responseString);
                if (response.errorCode !== 0) {
                    reject(new Error(response.message));
                }
                resolve(response.jsonData);
                clearInterval(handle);
            }
        }, 100);
        setTimeout(() => {
            clearInterval(handle);
            reject(new Error('Response not sent before timeout expires.'));
        }, 10 * 1000);
    }

    /**
     * Checks whether the searched commandObject has a response assigned or not.
     * @param {number} queueId
     */
    readResponse(queueId) {
        const commandObject = this.commandStack.find((c) => c.queueId === queueId);
        return commandObject === undefined ? -1 : commandObject.response;
    }

    /**
     * Resolves items of command stack with the response.
     * @param {MessageEvent} event
     */
    handleMessages(event) {
        const response = event.data;
        const { queueId } = JSON.parse(response);
        if (queueId !== undefined) {
            const commandObject = this.commandStack.find((c) => c.queueId === queueId);
            commandObject.response = response;
        }
    }
};
