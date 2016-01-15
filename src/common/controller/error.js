'use strict';
/**
 * error controller
 */
export default class extends think.controller.base {
  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
  async __before(){
    
    let tagCloud = await think.cache("tagCloud", undefined);
    if( ! tagCloud){
      tagCloud = await this.model("taxonomy").getHotTag();
      think.cache("tagCloud", tagCloud, {timeout: 3600});
    }
    
    let newList = await think.cache("newList", undefined);
    if( ! newList){
      newList = await this.model("article").getNewList();
      think.cache("newList", newList, {timeout: 3600});
    }
    
    this.assign({
      "tagCloud": tagCloud,
      "newList": newList
    });
  }   
   
  displayErrorPage(status){

    let errorConfig = this.config('error');
    let message = this.http.error && this.http.error.message || 'error';
    if(this.isJsonp()){
      return this.jsonp({
        [errorConfig.key]: status,
        [errorConfig.msg]: message
      })
    }else if(this.isAjax()){
      return this.fail(status, message);
    }

    let module = 'common';
    if(think.mode !== think.mode_module){
      module = this.config('default_module');
    }
    let file = `${module}/error/${status}.html`;
    let options = this.config('tpl');
    options = think.extend({}, options, {type: 'ejs', file_depr: '_'});
    return this.display(file, options);
  }
  /**
   * Bad Request 
   * @return {Promise} []
   */
  _400Action(){
    return this.displayErrorPage(400);
  }
  /**
   * Forbidden 
   * @return {Promise} []
   */
  _403Action(){
    return this.displayErrorPage(403);
  }
  /**
   * Not Found 
   * @return {Promise}      []
   */
  _404Action(){
    return this.displayErrorPage(404);
  }
  /**
   * Internal Server Error
   * @return {Promise}      []
   */
  _500Action(){
    return this.displayErrorPage(500);
  }
  /**
   * Service Unavailable
   * @return {Promise}      []
   */
  _503Action(){
    return this.displayErrorPage(503);
  }
}