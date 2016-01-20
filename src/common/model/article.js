'use strict';

/**
 * model
 */
export default class extends think.model.base {
  getList(where, order, page, offset){
    if( ! where) where = {};
    if( ! order) order = {creattime: "desc"};
    if( ! page) page = 1;
    if( ! offset) offset = 10;
    return this.where(where).order(order).page(page, offset).countSelect();
  }
  
  getInfoByid(id){
    return this.where({id: id}).find();
  }
  
  addInfo(info){
    return this.add(info);
  }
  
  editInfoById(id, info){
    return this.where({id: id}).update(info);
  }
  
  getNewList(){
    return this.order("creattime desc").limit(5).select();
  }
  
  async getNeighbor(id){
    let prev = await this.where({id: {"<": id}}).order("id desc").find();
    let next = await this.where({id: {">": id}}).order("id asc").find();
    return {
      prev: prev,
      next: next
    }
  }
  
  async getTimeLine(){
    let list = await this.field("DATE_FORMAT(creattime, \"%Y-%m\") dates").group("dates").order("dates desc").limit(10).select();
    let listTime = [], years = [], months = {};
    list.forEach(function(row){
      listTime.push(row.dates);
      let time = row.dates.split('-');
      let year = time[0];
      let month = time[1];
      if(years.indexOf(year) === -1){
        years.push(year);
      }
      if(think.isEmpty(months[year])){
        months[year] = [];
      }
      months[year].push(month);
    })
    let timeLine = {
      listTime: listTime,
      years: years,
      months: months
    }
    return timeLine;
  }
}