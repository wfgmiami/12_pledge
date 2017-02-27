'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
class $Promise{
  constructor(executor){
    this._state = 'pending';
    this._value;

    if (executor){
      var that = this;
      var resolve = function(arg){
        that._internalResolve(arg)
      };

      var reject = function(arg){
        that._internalReject(arg)
      };

      executor(resolve, reject);
    }

  }

  _internalResolve(data){

    if(this._state === 'pending'){
      this._state = 'fulfilled';
      this._value = data;
    }


  }

  _internalReject(reason){
    if(this._state === 'pending'){
      this._state = 'rejected';
      this._value = reason;
    }

  }

}



/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
