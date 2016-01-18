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
    
    this.leftNav = "taxonomy";
    
    let where = {};
    let getPage = this.get("page");
    let taxonomy = await this.model("taxonomy").getList(where, '', getPage, 20); 
    
    let siteUrl = this.config('siteUrl');
    let baseUrl = siteUrl('taxonomy/index/');
    
    let pageConf = {
      totalPages: taxonomy.totalPages,
      numsPerPage: taxonomy.numsPerPage,
      currentPage: taxonomy.currentPage,
      tagOpen: '<li>',
      tagClose: '</li>',
      baseUrl: baseUrl
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks(); 

    this.assign({
      list: taxonomy.data,
      links: links
    });    
    this.display();
  }
  
  
}