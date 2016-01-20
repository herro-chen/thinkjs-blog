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
 
  global.base64Toimg = function(base64Date){
    let imgArr = base64Date.split(',');
    let type = imgArr[0];
    let ext = false, base64 = '';
    // 判断类型  
    if(type.indexOf('image/jpeg') !== -1){  
      ext = '.jpg';  
    }else if(type.indexOf('image/gif') !== -1){  
      ext = '.gif';  
    }else if(type.indexOf('image/png') !== -1){  
      ext = '.png';  
    }
    if(ext){
      base64 = imgArr[1];
    }
    return {
      ext: ext,
      base64: base64
    };
    
  }