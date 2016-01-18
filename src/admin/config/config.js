'use strict';
/**
 * config
 */
export default {
  //key: value
  staticUrl: function(url){
              return "http://127.0.0.1:8360" + url;
             },
  
  siteUrl: function(url){
              return "http://127.0.0.1:8360/admin/" + url;
             },
  
};