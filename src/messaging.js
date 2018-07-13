const util = require('util');

const msgTypes = {
  any: 0,
  quest: 1,
  fight: 2,
  attacks: 4,
  itemEffect: 8,
  itemActions: 16
};

const outputs = {
  none: 0,
  console: 1,
  document: 2,
  util: 4
};

const outputTypes = msgTypes.fight | msgTypes.quest | msgTypes.attacks | msgTypes.itemEffects | msgTypes.itemActions;
const outputMethods = outputs.console;

const canOutput = function (type) {
  return ((outputTypes & type) === type);
};

const output = function (msg, type) {
  type |= type;
  if (canOutput(type)) {
    if((outputMethods & outputs.console) === outputs.console) {
      console.log(msg);
    }

    if((outputMethods & outputs.document) === outputs.document) {
      document.writeln(msg);
    }

    if((outputMethods & outputs.util) === outputs.util) {
      util.log(msg);
    }
  }
};

exports.msgTypes = msgTypes;
exports.canOutput = canOutput;
exports.output = output;

exports.attacks = function (msg) {
  output(msg, msgTypes.attacks);
};

exports.fight = function (msg) {
  output(msg, msgTypes.fight);
};

exports.itemActions = function (msg) {
  output(msg, msgTypes.itemActions);
};

exports.itemEffects = function (msg) {
  output(msg, msgTypes.itemEffects);
};

exports.quest = function (msg) {
  output(msg, msgTypes.quest);
};