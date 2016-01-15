'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
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
  
}