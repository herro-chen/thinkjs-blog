'use strict';

/**
 * model
 */
export default class extends think.model.base {

  getList(where, order, page, offset){
    if( ! where) where = {};
    if( ! order) order = {id: "desc"};
    if( ! page) page = 1;
    if( ! offset) offset = 10;
    return this.where(where).order(order).page(page, offset).countSelect();
  }
  
  getInfoById(id){
    return this.where({id: id}).find();
  }
  
  editInfoById(id, info){
    return this.where({id: id}).update(info);
  }  
  
  getAllCate(){
    return this.where({type: 1}).select();
  }
  
  getInfoByTag(tag){
    return this.where({name: tag, type: 2}).find();
  }

  getInfoBySlug(slug){
    return this.where({slug: slug, type: 1}).find();
  }
  
  getHotTag(){
    return this.where({type: 2}).order("count desc").limit(20).select();
  }
  
}