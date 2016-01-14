'use strict';

/**
 * model
 */
export default class extends think.model.base {

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