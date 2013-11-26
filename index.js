var Chain = function () {
  var Sequence = function () {
    return Sequence._methods;
  };
  
  Sequence._methods = [];
  
  Sequence.getMethodList = function () {
    return Sequence._methods;
  };
  
  Sequence.getMethod = function (name) {
    return Sequence._methods[name];
  };
  
  Sequence.add = function (name, task) {
    task = task || function (next) {
      next();
    };
    
    Sequence._methods[name] = task;
  };
  
  return Sequence;
};

var Continue = function () {
  return new Chain();
};

Continue.Chain = Chain;
module.exports = Continue;





/*

// instantiate a new continue chain
var chain = Continue({
  map: function (asdf, qer, zxcv, next) {
    next();
  }
});

chain.add('filter', function(items, something, next) {
  // filter logic
  var filteredItems = items;
  
  
  next(err, filteredItems);
});


chain([]).filter(function (item, next) {
  
}).then(function (items) {
  
});


// For During module
module.exports = function (list) {
  return chain(function (next) {
    next(null, list);
  });
}


chain(function (next) {
  var list = [];
  next(null, list)
}).filter().then();


 */