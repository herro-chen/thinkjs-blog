'use strict';

import moment from 'moment';

import Base from './base.js';

export default class extends Base {
  
  async __before(){
    let tagCloud = await this.model("taxonomy").getHotTag();
    let newList = await this.model("article").getNewList();
    this.assign({
      "tagCloud": tagCloud,
      "newList": newList
    });
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    this.navType = "home";
    let cacheValue = await think.cache("cache_home", undefined);
    if(cacheValue){
      cacheValue.moment = moment;
      this.assign(cacheValue);
      return this.display();      
    }
    
    let model = this.model("article");
    let timeLine = await model.getTimeLine();
    let list = {};
    for (let time of timeLine.listTime) {
      let sql = "SELECT id, title, thumbnail, creattime FROM think_article WHERE DATE_FORMAT(creattime, \"%Y-%m\") = \"%s\" ORDER BY creattime DESC LIMIT 4";
      sql = model.parseSql(sql, time);
      list[time] = await model.query(sql);      
    }
    let value = {
      timeLine: timeLine,
      list: list
    };
    think.cache("cache_home", value, {timeout: 60});
    
    value.moment = moment;
    this.assign(value);
    return this.display();
  }

}