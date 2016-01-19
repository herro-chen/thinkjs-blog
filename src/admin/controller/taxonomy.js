'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
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
  
  async editAction(){
    
    this.leftNav = "taxonomy";
    
    let taxonomyModel = this.model("taxonomy");
    
    if(this.isPost()){
      
      let id = this.post('id');
      let editInfo = {
        name: this.post('name'),
        slug: this.post('slug'),
        type: this.post('type'),
        description: this.post('description'),
        "parent": this.post('parent')
      };
      await taxonomyModel.editInfoById(id, editInfo);      
      
      let siteUrl = this.config('siteUrl');
      await this.redirect(siteUrl('taxonomy'));
      
    }else{
      let id = this.get('id');
      let taxonomy = await taxonomyModel.getInfoById(id);
      let cates = await taxonomyModel.getAllCate();
      this.assign({
        info: taxonomy,
        cates: cates
      });
      this.display();
    }
    
  }
  
}