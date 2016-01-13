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
    return this.join("LEFT JOIN think_article ON think_article.id = think_relationships.article_id").where(where).order(order).page(page, offset).countSelect();
  }
  
}