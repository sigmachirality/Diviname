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
    CompletedAnalyzeNameHandler : CompletedAnalyzeNameHandler
}