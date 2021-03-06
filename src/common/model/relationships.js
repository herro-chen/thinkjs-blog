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
  
  getAllByAid(article_id){
    return this.where({article_id: article_id}).select();
  }
  
  getTaxonomyByAid(article_id){
    return this.join("LEFT JOIN think_taxonomy ON think_taxonomy.id = think_relationships.taxonomy_id").where({"think_relationships.article_id": article_id}).select();
  }
  
  async addListByAid(article_id, list){
    for (let item of list) {
      let info = {
        article_id: article_id,
        taxonomy_id: item
      };
      let insertId = await this.add(info);
      if( insertId ){
        //分类加1
        await this.model("taxonomy").where({id: item}).increment("count", 1);
      }
    }
    
    return ;
  }
  
  async delListByAid(article_id, list){
    for (let item of list) {
      let info = {
        article_id: article_id,
        taxonomy_id: item
      };
      let affectedRows = await this.where(info).delete();
      if( affectedRows ){
        //分类加1
        await this.model("taxonomy").where({id: item}).decrement("count", 1);
      }
    }
    return ;
  }  
  
  
}