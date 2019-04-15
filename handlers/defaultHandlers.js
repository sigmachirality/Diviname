const nh = require('./nameHandlers');
// Handlers for default Intents, edited as appropriate.
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
            handlerInput.requestEnvelope.request.type === 'StartOverIntent';
    },
    async handle(handlerInput) {
        const welcomeReprompt = 'Say "analyze a name" to analyze a name.';
        var sessAttr = handlerInput.attributesManager.getSessionAttributes();
        var attributes = await handlerInput.attributesManager.getPersistentAttributes()
        let name = ""
        if (typeof sessAttr.name != 'undefined') {
            name = sessAttr.name;
        }
        else if (typeof attributes.name !== 'undefined') {
            name = attributes.name;
            sessAttr.name = attributes.name;
        }
        let welcomeOutput = `Welcome to Diviname ${name}. ` + 
            'I can help you understand whether your first name is helping or hurting you. ' + 
            'Say "analyze a name" to analyze a name.';
        var ret = handlerInput.responseBuilder
            .speak(welcomeOutput)
            .reprompt(welcomeReprompt)
            .getResponse();
        sessAttr.repeat = ret;
        sessAttr.last = "Launch";
        handlerInput.attributesManager.setSessionAttributes(sessAttr);
        return ret;
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        const speechText = (
            (attributes.name != null ? attributes.name : "") +
            'I can analyze the spiritual meaning behind any name for a given gender. ' +
            'Say "analyze a name" to analyze a name.'
        );
        var ret = handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        attributes.repeat = ret;
        attributes.last = "Help";
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return ret;
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        let speechText = attributes.name != null ? (
                'Goodbye, ' + attributes.name + "! Remember, your name can both help and hurt you!"
            ) : (
                'Goodbye! Remember, your name can both help and hurt you!'
            );
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        if (attributes.repeat != null) {
            return attributes.repeat;
        } else {
            attributes.repeat = handlerInput.responseBuilder
                .speak("Sorry, I don't remember anything to repeat. If you need more help, ask for it!")
                .getResponse();
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return attributes.repeat;
        }
    }
}
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    async handle(handlerInput) {
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        if (attributes.name != null) {
            let persistentAttr = {
                name: attributes.name
            }
            handlerInput.attributesManager.setPersistentAttributes(persistentAttr);
            await handlerInput.attributesManager.savePersistentAttributes();
        }
        return handlerInput.responseBuilder.getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = "Sorry, I couldn't understand what you said." +
        ` Please contact the developer and relay the following message: ${error.message} ${handlerInput.requestEnvelope.request.intent.name}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

module.exports = {
    LaunchRequestHandler : LaunchRequestHandler,
    HelpIntentHandler : HelpIntentHandler,
    CancelAndStopIntentHandler : CancelAndStopIntentHandler,
    RepeatIntentHandler : RepeatIntentHandler,
    SessionEndedRequestHandler : SessionEndedRequestHandler,
    ErrorHandler : ErrorHandler
}