'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  init(http){
    super.init(http);
  }
  
  async indexAction(){
    
    this.leftNav = "user";
    
    let where = {};
    let getPage = this.get("page");
    let users = await this.model("user").getList(where, '', getPage, 20); 
    
    let siteUrl = this.config('siteUrl');
    let baseUrl = siteUrl('user/index/');
    
    let pageConf = {
      totalPages: users.totalPages,
      numsPerPage: users.numsPerPage,
      currentPage: users.currentPage,
      tagOpen: '<li>',
      tagClose: '</li>',
      baseUrl: baseUrl
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks(); 

    this.assign({
      list: users.data,
      links: links
    });    
    this.display();
  }
  
  
}