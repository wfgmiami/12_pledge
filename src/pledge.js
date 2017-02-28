'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
class $Promise{
  constructor(executor){
    this._state = 'pending';
    this._value;
    this._handlerGroups = [];

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
      this._callHandlers();
    }
  }

  _internalReject(reason){
    if(this._state === 'pending'){
      this._state = 'rejected';
      this._value = reason;
      this._callHandlers();
    }
  }


  _callHandlers(){
      var index = this._handlerGroups.length;

      if(this._state === 'fulfilled' && index > 0){
        for (var i = 0; i < index; i++){
          this._handlerGroups[i].successCb(this._value);
        }
        this._handlerGroups=[];
      }else if(this._state === 'rejected' && index > 0){
        for (var i = 0; i < index; i++){
          this._handlerGroups[i].errorCb(this._value);
        }
        this._handlerGroups=[];
      }

  }

  then(success, error){

    var index =  this._handlerGroups.length;

    if (typeof success !== 'function') success = null;
    if (typeof error !== 'function') error = null;

    this._handlerGroups[index] = {
      successCb: success,
      errorCb: error
    }

    //this._callHandlers();
    if(this._state === 'fulfilled'){
      this._handlerGroups[index].successCb(this._value);
      this._handlerGroups=[];
    }
    if(this._state === 'rejected' && error !== null){
      this._handlerGroups[index].errorCb(this._value);
      this._handlerGroups=[];
    }
  }

  catch(error){
    this.then(null, error);
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
