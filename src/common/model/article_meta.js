'use strict';

/**
 * model
 */
export default class extends think.model.base {
  getInfoByAid(id){
    return this.where({"article_id": id}).select();
  }
}