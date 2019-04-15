const Alexa = require('ask-sdk-core');
const dh = require('./handlers/defaultHandlers');
const nh = require('./handlers/nameHandlers');
const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const persistenceAdapter = new DynamoDbPersistenceAdapter({
  tableName: 'UserStates',
  createTable: true
});

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
    .withPersistenceAdapter(persistenceAdapter)
  .addErrorHandlers(dh.ErrorHandler)
  .lambda();