'use strict';

import moment from 'moment';

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
    let where = {};
    if ( ! think.isEmpty(cate)) {
      where.cateid = cate.id;
    }
    let getPage = this.get("page") ? this.get("page") : 1;
    
    let article = await this.model("article").getList(where, '', getPage, 20);
    let list = {};
    let listTime = [], years = [], months = {};
    
    let pageConf = {
      totalPages: article.totalPages,
      numsPerPage: article.numsPerPage,
      currentPage: article.currentPage,
      baseUrl: '/topic/'
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
    
    //获取前后文章;
    let neighbor = await this.model("article").getNeighbor(id);
    
    this.assign({
      info: info,
      neighbor: neighbor
    });
    return this.display();
  }
  
}