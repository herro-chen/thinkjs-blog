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
    
    this.leftNav = "article";
    
    let where = {};
    let getPage = this.get("page");
    let article = await this.model("article").getList(where, '', getPage, 20); 
    
    let siteUrl = this.config('siteUrl');
    let baseUrl = siteUrl('article/index/');
    
    let pageConf = {
      totalPages: article.totalPages,
      numsPerPage: article.numsPerPage,
      currentPage: article.currentPage,
      tagOpen: '<li>',
      tagClose: '</li>',
      baseUrl: baseUrl
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks(); 
    
    this.assign({
      list: article.data,
      links: links
    });    
    this.display();
  }
  
  async editAction(){
    
    this.leftNav = "article";
    
    if(this.isPost()){
      console.log(this.post());
      let siteUrl = this.config('siteUrl');
      this.http.redirect(siteUrl('article'));
    }else{
      
      let id = this.get("id");
      let info = await this.model("article").getInfoByid(id); 
      let metas = await this.model("article_meta").getInfoByAid(id); 
      
      let relationships = await this.model("relationships").getAllByAid(id); 
      info.cates = [], info.tags = [],
      relationships.forEach(function(item){
        if(item.type == 1){
          info.cates.push(item.taxonomy_id);
        }else{
          info.tags.push(item.taxonomy_id);
        }
      })      
      
      let cates = [], tags= [];
      cates = await this.model("taxonomy").getAllCate(); 
      tags = await this.model("taxonomy").getHotTag();
      this.assign({
        cates: cates,
        tags: tags,
        info: info,
        metas: metas
      });     
      this.display(); 
    }
    
  }
  
  
}