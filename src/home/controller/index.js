'use strict';

import moment from 'moment';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    this.navType = "home";
    let timeLine = await this.model("article").getTimeLine();
    let article = await this.model("article").getList();
    
    let listTime = ["2015-11"];
    let list = {
      "2015-11": article.data
    }
    this.assign({
      timeLine: timeLine,
      listTime: listTime,
      list: list,
      moment: moment
    });
    return this.display();
  }
}