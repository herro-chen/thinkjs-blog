/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */
 
  global.addORdelForRelation = function(oldRelation, newRelation){
    let add = [], del = [];
    oldRelation.forEach(function(item){
      if(newRelation.indexOf(item) === -1){
        del.push(item);
      }
    })
    
    newRelation.forEach(function(item){
      if(oldRelation.indexOf(item) === -1){
        add.push(item);
      }
    })
    
    return {add: add, del: del};
  }
  
  global.strToarr = function(str){
    let arr = [];
    if( ! think.isEmpty(str)){
      if(think.isArray(str)){         
        arr = arr.concat(str);
      }else{
        arr[0] = str;
      }
    }
    return arr;
  }
 