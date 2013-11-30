var Continue = require('../');
var async = require('async');

var chain = Continue();

chain.add('each', function (items, filterFn, next) {
  async.each(items, filterFn, next);
});

chain.add('map', function (items, filterFn, next) {
  async.map(items, filterFn, next);
});

chain.add('filter', function (items, filterFn, next) {
  var self = this;
  var error;
  
  async.filter(items, function (item, callback) {
    filterFn(item, function (err, matched) {
      if (err) {
        error = err;
        return self.triggerError(err, item, 'filter');
      }
      callback(matched);
    });
  }, function (filteredItems) {
    next(error, filteredItems);
  });
});

var list = [
  {
    name: 'scott',
    age: 29
  },
  {
    name: 'lindsay',
    age: 25
  }
];

// chain(function (next) {
//   next(null, list);
// }).map(function (item, next) {
//   item.dance = 'fun';
//   next(null, item);
// }).filter(function (item, next) {
//   next('asdf', item.name == 'lindsay');
// }).then(function (items) {
//   console.log(items);
// });

chain(list)
.filter(function (item, next) {
  next(null, true);
})
.map(function (item, next) {
  next(null, item.age);
})
.then(function (items) {
  console.log(items);
}, function (errs) {
  console.log(errs);
});














//var Continue = require('../');
//var expect = require('expect.js');
//
//describe('Continue', function () {
//  var chain;
//
//  beforeEach(function () {
//     chain = Continue();
//  });
//
//  it('Chain instance is a method', function () {
//    expect(chain).to.be.a('function');
//  });
//
//  describe('#add()', function() {
//    it('adds methods to the methods list with the given name', function () {
//      chain.add('method1');
//      expect(chain.getMethod('method1')).to.not.be(undefined);
//    });
//
//    it('adds a method to the methods list with the given definition', function () {
//      var method = function (next) {
//        next();
//      };
//      chain.add('method1', method);
//
//      expect(chain.getMethod('method1')).to.be.a('function');
//      expect(chain.getMethod('method1').toString()).to.equal(method.toString());
//    });
//
//    it('defaults to an empty method if no method definition is given', function () {
//      chain.add('method1');
//      expect(chain.getMethod('method1')).to.be.a('function');
//    });
//
//    it('adds the method definition to the object chain', function () {
//      var method = function (next) {next();};
//      chain.add('method1', method);
//
//      expect(chain().method1.toString()).to.equal(method.toString());
//    });
//  });
//});
//
//
