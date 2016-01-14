'use strict';
/**
 * config
 */
export default {
  //key: value
  siteUrl: "http://127.0.0.1:8360",
  staticUrl: function(url){
              return "http://127.0.0.1:8360" + url;
             }
};