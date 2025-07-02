const Alexa = require('ask-sdk-core');
const https = require('https');

const PlaceOrderIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlaceOrderIntent';
  },
  async handle(handlerInput) {
    const dish = handlerInput.requestEnvelope.request.intent.slots.Dish.value;
    // call webhook
    // ...
    const speakOutput = `Ihre ${dish}-Bestellung wurde aufgegeben.`;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(PlaceOrderIntentHandler)
  .lambda();
