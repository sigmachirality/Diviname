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
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues = getSlotValues(filledSlots);

        let analysis = divination.getNameMeaning(slotValues.first, slotValues.gender);
        let speechOutput = ('I\'ve analyzed your name, ' + slotValues.first + 
            '. Here is what your name tells me about you. ' + analysis + 
            'Would you like to allow a different person to analyze their name, ' + 
            slotValues.first + "?");
        let attributes = {};
        attributes.name = slotValues.first;
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
} 
// Helper functions
function getSlotValues(filledSlots) {
    const slotValues = {};
    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;
    
        if (filledSlots[item] &&
          filledSlots[item].resolutions &&
          filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
          filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
          filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
          switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            case 'ER_SUCCESS_MATCH':
              slotValues[name] = {
                synonym: filledSlots[item].value,
                resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                isValidated: true,
              };
              break;
            case 'ER_SUCCESS_NO_MATCH':
              slotValues[name] = {
                synonym: filledSlots[item].value,
                resolved: filledSlots[item].value,
                isValidated: false,
              };
              break;
            default:
              break;
          }
        } else {
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
        }
      }, this);
    
      return slotValues;
}
// Module exports
module.exports = {
    InProgressAnalyzeNameHandler : InProgressAnalyzeNameHandler,
    CompletedAnalyzeNameHandler : CompletedAnalyzeNameHandler
}