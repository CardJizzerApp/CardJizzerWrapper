// eslint-disable-next-line
const {CommandObject} = require('./commandObject');

exports.WebsocketWrapper = class WebsocketWrapper {
    /**
     * Initializes the websocket and the commandStack
     * @param {Object} options
     * @param {String} options.url CardJizzerBackend URL
     */
    constructor(options) {
        this.nextQueueId = 0;
        this.commandStack = [];
        this.websocket = new WebSocket(options.url);
        this.websocket.onmessage = (event) => this.handleMessages(event);
    }

    /**
     * Sends a command to the backend and returns a Promise with the response.
     * @param {CommandObject} commandObject the CommandObject
     * @return {Promise<Object>} the response
     */
    sendCommand(commandObject) {
        return new Promise((resolve, reject) => {
            const queueId = this.appendCommandToStack(commandObject);
            this.websocket.send(JSON.stringify(commandObject));

            const handle = setInterval(() => {
                const response = JSON.parse(this.readResponse(queueId));
                if (response !== undefined) {
                    if (response.errorCode !== 0) {
                        reject(new Error(response.message));
                    }
                    resolve(response);
                    clearInterval(handle);
                }
            }, 100);
            setTimeout(() => {
                clearInterval(handle);
                reject(new Error('Response not sent before timeout expires.'));
            }, 10 * 1000);
        });
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

    /**
     * Appends a commandObject to the commandStack.
     * @param {CommandObject} commandObject
     * @return {number} queueId
     */
    appendCommandToStack(commandObject) {
        const object = JSON.parse(JSON.stringify(commandObject));
        object.queueId = this.nextQueueId;
        this.nextQueueId += 1;
        this.commandStack.push(object.id);
        return object.queueId;
    }

    /**
     * Checks whether the searched commandObject has a response assigned or not.
     * @param {number} queueId
     */
    readResponse(queueId) {
        return this.commandStack.find((c) => c.queueId === queueId).response;
    }
};
