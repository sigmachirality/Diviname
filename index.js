const Alexa = require('ask-sdk-core');
const dh = require('./handlers/defaultHandlers');
const nh = require('./handlers/nameHandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    dh.LaunchRequestHandler,
    nh.InProgressAnalyzeNameHandler,
    nh.CompletedAnalyzeNameHandler,
    nh.AnalyzeHealthHandler,
    nh.RedirectHealthHandler,
    dh.HelpIntentHandler,
    dh.CancelAndStopIntentHandler,
    dh.SessionEndedRequestHandler)
  .addErrorHandlers(dh.ErrorHandler)
  .lambda();