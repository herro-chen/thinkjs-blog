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
  
  getInfoByName(name){
    return this.where({name: name}).find();
  }
  
  getInfoByUid(id){
    return this.where({id: id}).find();
  }
  
  editInfoById(id, info){
    return this.where({id: id}).update(info);
  }
  
  generatePwd(pwd){
    let salt = Math.floor(Math.random() * 100000);
    return {
      pwd: think.md5(pwd + "" + salt),
      salt: salt
    }
  }
  
  checkPwd(pwd, userInfo){
    let md5Pwd = think.md5(pwd + "" + userInfo.salt);
    if(md5Pwd == userInfo.pwd)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
}