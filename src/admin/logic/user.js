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
        name: "string|post|required|minLength:3|maxLength:20",
        pwd: "string|post|minLength:6|maxLength:18",
        salt: "int|post|minLength:3|maxLength:6"
      } 
    }
    
    let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
    }    
  }  
  
}