'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
   
  base64Action(){
    let rules = {

    }

    let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
    }
  }   
   
  ckeditorAction(){
    let rules = {
      upload: "object|file|image|required",
    }

    let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
    }
  }
  
}