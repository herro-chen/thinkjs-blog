'use strict';
/**
 * model
 */
export default class extends think.model.base {
  getInfoByName(name){
    return this.where({name: name}).find();
  }
}