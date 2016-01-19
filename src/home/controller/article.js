'use strict';

import moment from 'moment';
import cheerio from "cheerio";

import Base from './base.js';

export default class extends Base {
  
  init(http){
    super.init(http);
  }  
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.topicAction();
  }
  
  /**
   * search action
   * @return {Promise} []
   */  
  async searchAction(){
    let keyword = this.get("keyword");
    if( ! keyword) return think.statusAction(404, this.http);
    let getPage = this.get("page") ? this.get("page") : 1;
    
    let article = await this.model("article").where({title: ["like", "%"+ keyword +"%"]}).order("creattime DESC").page(getPage, 20).countSelect();
    
    let pageConf = {
      totalPages: article.totalPages,
      numsPerPage: article.numsPerPage,
      currentPage: article.currentPage,
      baseUrl: '/search?keyword=' + keyword + '&page='
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks();
    
    let taxonomy = {
      slug: keyword,
      name: keyword
    };

    this.assign({
      taxonomy: taxonomy,
      list: article.data,
      links: links,
      moment: moment
    });
    return this.display("portray");    
  }
  
  /**
   * tag action
   * @return {Promise} []
   */  
  async tagAction(){
    return this.topicAction();
  }
    
  /**
   * topic action
   * @return {Promise} []
   */  
  async topicAction(){
    this.navType = "topic";
    let where = {};
    let getPage = this.get("page") ? this.get("page") : 1;
    let tag = this.get("tag") ? this.get("tag") : '';
    console.log(getPage);
    let article, baseUrl;
    if (tag){
      let taxonomy = await this.model("taxonomy").getInfoByTag(tag);
      if (think.isEmpty(taxonomy)) return think.statusAction(404, this.http);
      where = {
        "think_relationships.taxonomy_id": taxonomy.id
      };
      article = await this.model("relationships").getList(where, '', getPage, 20);
      baseUrl = '/tag/' + tag + '/';
    }else{
      article = await this.model("article").getList(where, '', getPage, 20); 
      baseUrl = '/topic/';
    }
    
    let list = {};
    let listTime = [], years = [], months = {};
    
    let pageConf = {
      totalPages: article.totalPages,
      numsPerPage: article.numsPerPage,
      currentPage: article.currentPage,
      baseUrl: baseUrl
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks();

    article.data.forEach(function(info){
      let date = moment(info.creattime).format("YYYY-MM");
      let time = date.split('-');
      let year = time[0];
      let month = time[1];
      if(listTime.indexOf(date) === -1){
        listTime.push(date);
      }
      if(think.isEmpty(list[date])){
        list[date] = [];
      }
      list[date].push(info);
      if(years.indexOf(year) === -1){
        years.push(year);
      }
      if(think.isEmpty(months[year])){
        months[year] = [];
      }
      if(months[year].indexOf(month) === -1){
        months[year].push(month);
      }
    })

    let timeLine = {
      listTime: listTime,
      years: years,
      months: months
    }
    
    this.assign({
      timeLine: timeLine,
      list: list,
      links: links,
      moment: moment
    });
    return this.display("topic");
  }
  
  /**
   * portray action
   * @return {Promise} []
   */
  async portrayAction(){    
    this.navType = "portray";
    let where = {};
    let getPage = this.get("page") ? this.get("page") : 1;
    let slug = this.get("slug") ? this.get("slug") : '';

    let taxonomy, article, baseUrl, parentId;
    if (slug){
      taxonomy = await this.model("taxonomy").getInfoBySlug(slug);
      if (think.isEmpty(taxonomy)) return think.statusAction(404, this.http);
      parentId = taxonomy.id;
      baseUrl = '/portray/' + slug + '/';
    } else {
      taxonomy = await this.model("taxonomy").getInfoBySlug('portray');
      parentId = taxonomy.id;
      baseUrl = '/portray/';
    }
    
    //获取子分类
    let sons = await this.model("taxonomy").where({parent: parentId}).select();
    let sonIds = [];
    sonIds.push(parentId);
    sons.forEach(function(son){
      sonIds.push(son.id);
    })
    
    where = {
      "think_relationships.taxonomy_id": {
        IN: sonIds
      }
    };
    article = await this.model("relationships").getList(where, '', getPage, 20);
    
    let pageConf = {
      totalPages: article.totalPages,
      numsPerPage: article.numsPerPage,
      currentPage: article.currentPage,
      baseUrl: baseUrl
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks();
    
    this.assign({
      taxonomy: taxonomy,
      list: article.data,
      links: links,
      moment: moment
    });
    return this.display();
  }
  
  /**
   * magazine action
   * @return {Promise} []
   */
  async magazineAction(){
    this.navType = "magazine";
    let getPage = this.get("page") ? this.get("page") : 1;
    
    let where = {
      "think_relationships.taxonomy_id" : 5
    };
    let article = await this.model("relationships").getList(where, '', getPage, 10);
    
    let articleIds = [];
    let metas = {};
    article.data.forEach(function(item){
      articleIds.push(item.id);
      metas[item.id] = {};
    })
    
    let metaList = await this.model("article_meta").getInfoByAid({IN : articleIds});
    
    
    metaList.forEach(function(meta){
      metas[meta.article_id][meta.meta_key] = meta.meta_value;
    })
    console.log(metas);
    
    let pageConf = {
      totalPages: article.totalPages,
      numsPerPage: article.numsPerPage,
      currentPage: article.currentPage,
      baseUrl: '/magazine/'
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks();
    this.assign({
      metas: metas,
      list: article.data,
      links: links,
      moment: moment
    });    
    return this.display();
  }
  
  /**
   * rss action
   * @return {Promise} []
   */  
  async rssAction(){
    this.http.header('Content-Type', 'application/xml');
    let article = await this.model("article").order("creattime desc").limit(50).select();
    this.assign({
      article: article
    });
    return this.display();
  }
  
  /**
   * view action
   * @return {Promise} []
   */
  async viewAction(){
    let id = this.get("id") ? this.get("id") : 0;
    let info = await this.model("article").getInfoByid(id);
    if(think.isEmpty(info)) return think.statusAction(404, this.http);
    
    //获取tags
    let taxonomy = await this.model("relationships").getTaxonomyByAid(id);
    let tags = [];
    taxonomy.forEach(function(item){
      if(item.type == 2){
        tags.push(item);
      }
    })
    
    //获取meta
    let metaList = await this.model("article_meta").getInfoByAid(id);
    let metas = {};
    metaList.forEach(function(meta){
      metas[meta.meta_key] = meta.meta_value;
    })
    
    //替换内容图片路径
    let $ = cheerio.load(info.content);
    let staticUrl = this.config('staticUrl');
    $('img').each(function(){
      let picSrc = $(this).attr('src');      
      let picPath = staticUrl(picSrc);
      //替换文章图片路径
      info.content = info.content.replace(picSrc, picPath);
    })
    
    //获取前后文章;
    let neighbor = await this.model("article").getNeighbor(id);
    
    this.assign({
      info: info,
      tags: tags,
      metas: metas,
      neighbor: neighbor
    });
    return this.display();
  }
  
}