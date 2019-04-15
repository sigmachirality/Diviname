// Handlers for default Intents, edited as appropriate.
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        let welcomeOutput = attributes.name != null ? (
            'Welcome back to Diviname, ' + attributes.name +
            'I can still help you understand whether your first name is helping or hurting you. ' + 
            'Would you like to divine the meaning behind your name again?'
        ) : (
            'Welcome to Diviname. ' + 
            'I can help you understand whether your first name is helping or hurting you. ' + 
            'Would you like to divine the meaning behind your name?'
        );
        const welcomeReprompt = 'Would you like to analyze the meaning of your name?';
        return handlerInput.responseBuilder
            .speak(welcomeOutput)
            .reprompt(welcomeReprompt)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const speechText = (
            (attributes.name != null ? attributes.name : "") +
            'I can analyze the spiritual meaning behind any name for a given gender. ' +
            'Would you like me to analyze a name?'
        );

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
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
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
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
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

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
    SessionEndedRequestHandler : SessionEndedRequestHandler,
    ErrorHandler : ErrorHandler
}