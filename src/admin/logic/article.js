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
  
  editAction(){
    
    let rules = {};
    if(this.isGet()){
      rules = {
        id: "int|get|required",
      }      
    }else{
      rules = {
        id: "int|post|required",
        title: "string|post|required",
        thumbnail: "string|post|required",
        description: "string|post|required",
        content: "string|post|required"
      }      
    }
    
    let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
    }    
  }
  
}