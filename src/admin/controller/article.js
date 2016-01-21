'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */   
  async indexAction(){
    
    let siteUrl = this.config('siteUrl');
    this.leftNav = "article";
    this.contentNav = {
      name: '文档',
      url: siteUrl('article')
    }
    
    let where = {};
    let getPage = this.get("page");
    let article = await this.model("article").getList(where, '', getPage, 20); 
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
  
  async addAction(){
    
    let siteUrl = this.config('siteUrl');
    this.leftNav = "article";
    this.contentNav = {
      name: '文档',
      url: siteUrl('article')
    }
    
    let articleModel = this.model("article");
    let relationshipsModel = this.model("relationships");
    
    if(this.isPost()){
      
      let addInfo = {
        title: this.post('title'),
        thumbnail: this.post('thumbnail'),
        description: this.post('description'),
        content: this.post('content'),
        creattime: '',
        source: new Date().getTime()
      };
      let id = await articleModel.addInfo(addInfo);

      let cates = [], tags= [];
      cates = strToarr(this.post('cates'));
      tags = strToarr(this.post('tags'));
      let newRelation = [];
      newRelation = newRelation.concat(cates, tags);

      await relationshipsModel.addListByAid(id, newRelation);

      await this.redirect(siteUrl('article'));
    }else{
      
      let cates = [], tags= [];
      cates = await this.model("taxonomy").getAllCate(); 
      tags = await this.model("taxonomy").getHotTag();

      this.assign({
        cates: cates,
        tags: tags
      });        
      this.display(); 
    }
    
  }
  
  async editAction(){
    
    let siteUrl = this.config('siteUrl');
    this.leftNav = "article";
    this.contentNav = {
      name: '文档',
      url: siteUrl('article')
    }
    
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
      await this.redirect(siteUrl('article'));
    }else{
      
      let id = this.get("id");
      let info = await articleModel.getInfoByid(id); 
      let metas = await this.model("article_meta").getInfoByAid(id); 
      
      let relationships = await this.model("relationships").getAllByAid(id); 
      info.relationships = []
      relationships.forEach(function(item){
          info.relationships.push(item.taxonomy_id);
      })      
      console.log(info);
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