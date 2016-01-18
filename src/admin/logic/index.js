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
  indexAction(){
   
  }
  
  loginAction(){
    let rules = {
      name: "string|required|length:3,20",
      pwd: "string|required|length:6,18"
    }
    if(this.isPost()){
      let flag = this.validate(rules);
      if(!flag){
        return this.fail("validate error", this.errors());
      }      
    }
  }
  
}