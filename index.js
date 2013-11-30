var Promise = require('promise');

var Chain = function () {
  var sequence = function (items) {
    
    // TODO: make starting with a method work
    // optionally allow starting with just an array/collection
    
    // listFn(function (err, items) {
    //   if (err) return sequence.triggerError(err, [], 'start');
    //   sequence._items = items;
    // });

    sequence._items = items;
    return sequence._methods;
  };

  sequence._errors = [];

  sequence._methods = {
    then: function (success, error) {
      if (success && !sequence._errors.length) return success(sequence._items);
      if (error) error(sequence._errors);
      
      sequence._errors = [];
    }
  };
  
  sequence.triggerError = function (err, item, fnName) {
    // TODO: stop all method chain calls and
    // perform the error callback
    
    sequence._errors.push({
      error: err,
      item: item,
      fnName: fnName
    });
  };
  
  sequence.getMethodList = function () {
    return sequence._methods;
  };

  sequence.getMethod = function (name) {
    return sequence._methods[name];
  };

  sequence.add = function (name, fn) {
    sequence._methods[name] = function (filterFn) {
      fn.call(sequence, sequence._items, filterFn, function  (err, items) {
        sequence._items = items;
      });
      
      return sequence._methods;
    }
  };
  
  sequence.start = function () {
    console.log(start);
  };

  return sequence;
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