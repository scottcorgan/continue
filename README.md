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

### then()

### drain()


## Run Tests

```
npm install
npm test
```
