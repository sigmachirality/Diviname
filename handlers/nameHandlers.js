const divination = require("./divination");
// Handlers
const InProgressAnalyzeNameHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AnalyzeNameIntent' &&
            request.dialogState !== 'COMPLETED';
    },
    handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        return handlerInput.responsebuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    }
};
const CompletedAnalyzeNameHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AnalyzeNameIntent';
    },
    handle(handlerInput) {
        const first = handlerInput.requestEnvelope.request.intent.slots.first.value;
        const gender = handlerInput.requestEnvelope.request.intent.slots.gender.value;
        let analysis = divination.getNameMeaning(first, gender);
        let speechOutput = ('I\'ve analyzed your name, ' + first + 
            '. Here is what your name tells me about you. ' + analysis + 
            ' Would you like to allow a different person to analyze their name, ' +
            'or allow a different person to analyze their health, '  + 
            first + "?");
        let attributes = {};
        attributes.name = first;
        attributes.gender = gender;
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
}
const RedirectHealthHandler = {
    canHandle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
            request.intent.name === 'AnalyzeHealthIntent'
    },
    handle(handlerInput) {
        let speechOutput = ("You should analyze your name before you analyze your health. What would you like to do?");
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
} 
const AnalyzeHealthHandler = {
    canHandle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
            request.intent.name === 'AnalyzeHealthIntent' &&
            attributes.name != null && 
            attributes.gender != null;
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const first = attributes.name;
        const gender = attributes.gender;
        let analysis = divination.getHealthMeaning(first, gender);
        let speechOutput = ('I\'ve analyzed your health, ' + first + 
            '. ' + analysis + 
            ' Would you like to allow a different person to analyze their name, ' + 
            first + "?");
        let attributes = {};
        attributes.name = first;
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
} 
// Module exports
module.exports = {
    InProgressAnalyzeNameHandler : InProgressAnalyzeNameHandler,
    CompletedAnalyzeNameHandler : CompletedAnalyzeNameHandler,
    RedirectHealthHandler : RedirectHealthHandler,
    AnalyzeHealthHandler : AnalyzeHealthHandler
}