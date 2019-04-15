const divination = require("./divination");
// Handlers
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
            ' Say "analyze a name" to analyze another name, ' +
            'or say "analyze my health" to get a health analysis based on your name, ' +
            first + ".");
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.name = first;
        attributes.gender = gender;
        var ret = handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
        attributes.repeat = ret;
        attributes.last = "Name";
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return ret;
    }
}
const RedirectHealthHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
            request.intent.name === 'AnalyzeHealthIntent'
    },
    handle(handlerInput) {
        let speechOutput = ("You should analyze your name before you analyze your health. Say 'analyze a name' to analyze a name.");
        var ret = handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.repeat = ret;
        attributes.last = "Health";
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return ret;
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
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        const first = attributes.name;
        const gender = attributes.gender;
        let analysis = divination.getHealthMeaning(first, gender);
        let speechOutput = ('I\'ve analyzed your health, ' + first + 
            '. ' + analysis + 
            ' What would you like to do now, ' + 
            first + "? Say analyze a name to analyze a name.");
        var ret = handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
        attributes.repeat = ret;
        attributes.last = "AnalyzeHealth";
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return ret;
    }
} 
// Module exports
module.exports = {
    CompletedAnalyzeNameHandler : CompletedAnalyzeNameHandler,
    RedirectHealthHandler : RedirectHealthHandler,
    AnalyzeHealthHandler : AnalyzeHealthHandler
}