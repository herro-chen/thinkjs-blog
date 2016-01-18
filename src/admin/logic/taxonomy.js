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
    let rules = {
      page: "int|get|default:1",
    }

    let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
    }
  }
  
}