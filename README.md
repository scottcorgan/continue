# continue

Compose chainable async methods.

## Install

```
npm install continue --save
```

## Usage

```js
var Continue = require('continue');
var chain = Continue();
var async = require('async'); // <~~ simply for usage example

// Add methods to our chain sequence
chain.add('map', function (items, iterator, next) {
  async.map(items, iterator, next);
});

chain.add('sortBy', function (items, iterator, next) {
  async.sortBy(items, iterator, next);
});

chain.add('filter', function (items, iterator, next) {
  var self = this;
  var error;
  
  async.filter(items, function (item, callback) {
    iterator(item, function (err, matched) {
      if (err) {
        error = err;
        return;
      }
      
      callback(matched);
    });
  }, function (filteredItems) {
    next(error, filteredItems);
  });
});

// Use our chain
var list = [
  {
    name: 'John',
    age: 25
  },
  {
    name: 'Jane',
    age: 20
  }
];

chain(list)
  .sortBy(function (item, next) {
    next(null, item.age);
  })
  .map(function (item, next) {
    next(null, item.age);
  })
  .then(function (items) {
    // items now equals: [20, 25]
  }, function () {
    // oops, an error may have occured
  });
```

## instance methods

These methods are available on the `chain` variable.

### add(methodName, methodTask)

Composes a chainable method on the chain. The method is added for all instances of that particular chain.

**methodName**

A string that will be used as the method name

**methodTask**

A callback function that is passed the following parameters

* `items` - any value that you would like passed to the first method in the chain
* `iterator` - the method called on the value from the previous method that performs some sort of user defined operation
* `next` - the callback once all items in the list or collection have been processed.

## chain sequence methods

These methods are available on the value returned from called `chain(someValue)`

The methods available vary according to which methods have been added to the chain. In the usage example above, we've added `map`, `sortBy`, and `filter`. These methods would be available on the chain as well as:

### then(successCallback, errorCallback)

Each chain sequence returns a promise. Refer to the [Promises/A+](http://promises-aplus.github.io/promises-spec/) spec for more details.

**successCallback**

This is called once all chained methods have processed the initial value, unless an error has occurred.

**errorCallback**

This is called if an error occurs anywhere when processing the initial value in any of the chainable methods. If an error occurs, all processing stops.

### drain()

Runs each method in the chain b draining the chain queue on next tick.


## TODO

* more detailed documentation
* allow callbacks on each chained method
* allow promises to be passed in as inititial value to chain
* **Continue** module examples


## Run Tests

```
npm install
npm test
```
