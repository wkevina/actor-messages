export default class MessageBroker {
    constructor() {
        /* keys: sender, values: Map(keys: messageType, values: Map(keys: listener, value: handler)) */
        this.registry = new Map();
        this.broadcastList = [];
    }

    registerBroadcastListener(listener, handler, messageType, sender) {

        let registeredForSender = this.registry.get(sender);
        if (!registeredForSender) {
            registeredForSender = new Map();
            this.registry.set(sender, registeredForSender);
        }

        let handlersForMessageType = registeredForSender.get(messageType);
        if (!handlersForMessageType) {
            handlersForMessageType = new Map();
            registeredForSender.set(messageType, handlersForMessageType);
        }

        handlersForMessageType.set(listener, handler);
    }

    unregisterBroadcastListener(listener, messageType, sender) {
        this.registry.get(sender).get(messageType).delete(listener);
    }

    emitBroadcastMessage(sender, messageType, message) {
        this.broadcastList.push({
            sender, messageType, message
        });
    }

    deliverMessages() {

        this.broadcastList.forEach(
            ({sender, messageType, message}) => {
                try {
                    let listeners = this.registry.get(sender).get(messageType);

                    listeners.forEach((handler, listener) => {
                        handler.call(listener, message);
                    });
                } catch (ex) {

                }

            }

        );

        this.broadcastList = [];
    }

}
