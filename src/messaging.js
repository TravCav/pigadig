const msgTypes = {
  none: 0,
  quest: 1,
  fight: 2,
  attacks: 4,
  itemEffect: 8,
  itemActions: 16
};

const outputs = msgTypes.fight | msgTypes.quest | msgTypes.attacks | msgTypes.itemEffects | msgTypes.itemActions;

const canOutput = function (type) {
  return ((outputs & type) === type);
};

const output = function (msg, type) {
  if (canOutput(type)) {
    console.log(msg);
  }
};

exports.msgTypes = msgTypes;
exports.canOutput = canOutput;
exports.output = output;

exports.attacks = function(msg) {
  output(msg, msgTypes.attacks);
};

exports.fight = function(msg) {
  output(msg, msgTypes.fight);
};

exports.itemActions = function(msg) {
  output(msg, msgTypes.itemActions);
};

exports.itemEffects = function(msg) {
  output(msg, msgTypes.itemEffects);
};

exports.quest = function(msg) {
  output(msg, msgTypes.quest);  
};