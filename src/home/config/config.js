'use strict';
/**
 * config
 */
export default {
  //key: value
  siteUrl: function(url){
              return "http://127.0.0.1:8360/" + url;
             },
  staticUrl: function(url){
              return "http://127.0.0.1:8360" + url;
             }
};