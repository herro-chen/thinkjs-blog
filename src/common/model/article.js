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
  
  async getTimeLine(){
    let list = await this.field("DATE_FORMAT(creattime, \"%Y-%m\") dates").group("dates").order("dates desc").limit(10).select();
    let years = [], months = {};
    list.forEach(function(row){
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
      years: years,
      months: months
    }
    return timeLine;
  }
}