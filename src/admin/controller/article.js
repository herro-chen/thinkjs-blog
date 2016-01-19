'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */   
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
    
    let articleModel = this.model("article");
    
    if(this.isPost()){

      let id = this.post('id');      
      let editInfo = {
        title: this.post('title'),
        thumbnail: this.post('thumbnail'),
        description: this.post('description'),
        content: this.post('content')
      };
      await articleModel.editInfoById(id, editInfo);
      
      let relationshipsModel = this.model("relationships");
      
      let relationships = await relationshipsModel.getAllByAid(id);
      
      let oldRelation = [];
      relationships.forEach(function(item){
        oldRelation.push(item.taxonomy_id + "");
      })
      
      let cates = [], tags= [];
      cates = strToarr(this.post('cates'));
      tags = strToarr(this.post('tags'));
      let newRelation = [];
      newRelation = newRelation.concat(cates, tags);

      let relations = addORdelForRelation(oldRelation, newRelation);
      await relationshipsModel.addListByAid(id, relations.add);
      await relationshipsModel.delListByAid(id, relations.del);
      
      let siteUrl = this.config('siteUrl');
      await this.redirect(siteUrl('article'));
    }else{
      
      let id = this.get("id");
      let info = await articleModel.getInfoByid(id); 
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