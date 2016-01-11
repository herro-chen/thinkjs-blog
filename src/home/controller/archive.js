'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  
  /**
   * topic action
   * @return {Promise} []
   */  
  async topicAction(){
    this.navType = "topic";
    let cateName = this.get("cateName") ? this.get("cateName") : '';
    let cate = await this.model("category").getInfoByName(cateName);
    if (think.isEmpty(cate)) return think.statusAction(404, this.http);
    let getPage = this.get("page") ? this.get("page") : 1;
    let list = await this.model("article").getList({cateid: cate.id}, '', getPage);
    this.assign({
      list: list
    });
    return this.display("topic");
  }
  
  /**
   * portray action
   * @return {Promise} []
   */
  portrayAction(){
    this.navType = "portray";
    return this.display();
  }
  
  /**
   * magazine action
   * @return {Promise} []
   */
  magazineAction(){
    this.navType = "magazine";
    return this.display();
  }
  
  /**
   * magazine action
   * @return {Promise} []
   */
  async viewAction(){
    let id = this.get("id") ? this.get("id") : 0;
    let info = await this.model("article").getInfoByid(id);
    if(think.isEmpty(info)) return think.statusAction(404, this.http);
    this.assign({
      info: info
    });
    return this.display();
  }
  
}