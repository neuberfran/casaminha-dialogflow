'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request, response});

  async function getLigar(agent) {
    // var gpioalarmstateb = agent.parameters;
     return await db.collection('products').doc('tutorial').get()
      .then(doc => {
        const xalarmstate = doc.data().gpioalarmstate;
        if (!xalarmstate) {
            db.collection('products').doc('tutorial').update({
            gpioalarmstate: true
          })
          agent.add(`Ok`);
        }else{
          agent.add(`O alarme já está ligado`);
        }
      });
  }

  async function getDesligar(agent) {
    // var gpioalarmstateb = agent.parameters;
    return await db.collection('products').doc('tutorial').get()
      .then(doc => {
        const xalarmstateD = doc.data().gpioalarmstate;
        if (xalarmstateD) {
            db.collection('products').doc('tutorial').update({
            gpioalarmstate: false
          })
          agent.add(`Ok`);
        }else{
          agent.add(`O alarme já está desligado`);
        }
      });
  }

  async function getAbrirr(agent) {
    // var gpiogaragestateb = agent.parameters;
    return await db.collection('products').doc('tutorial').get()
      .then(doc => {
        const xgaragestate = doc.data().gpiogaragestate;
        if (!xgaragestate) {
            db.collection('products').doc('tutorial').update({
            gpiogaragestate: true
          })
          agent.add(`Ok`);
        }else{
          agent.add(`A garagem já está aberta`);
        }
      });
  }

  async function getFechar(agent) {
  //  var gpiogaragestateb = agent.parameters;
    return await db.collection('products').doc('tutorial').get()
      .then(doc => {
        const xgaragestateF = doc.data().gpiogaragestate;
        if (xgaragestateF) {
            db.collection('products').doc('tutorial').update({
            gpiogaragestate: false
          })
          agent.add(`Ok`);
        }else{
          agent.add(`A garagem já está fechada`);
        }
      });
  }

  let intentMap = new Map();
  intentMap.set('Ligar', getLigar);
  intentMap.set('Desligar', getDesligar);
  intentMap.set('Abrir', getAbrirr);
  intentMap.set('Fechar', getFechar);
  agent.handleRequest(intentMap);
});