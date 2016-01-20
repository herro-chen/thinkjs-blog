'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    
    let siteUrl = this.config('siteUrl');
    this.leftNav = "user";
    this.contentNav = {
      name: '用户',
      url: siteUrl('user')
    }
    
    let where = {};
    let getPage = this.get("page");
    let users = await this.model("user").getList(where, '', getPage, 20);
    let baseUrl = siteUrl('user/index/');
    
    let pageConf = {
      totalPages: users.totalPages,
      numsPerPage: users.numsPerPage,
      currentPage: users.currentPage,
      tagOpen: '<li>',
      tagClose: '</li>',
      baseUrl: baseUrl
    }
    let paginationService = think.service("pagination");
    let pagination = new paginationService();
    let links = pagination.initialize(pageConf).createLinks(); 

    this.assign({
      list: users.data,
      links: links
    });    
    this.display();
  }
  
  async editAction(){
    
    let siteUrl = this.config('siteUrl');
    this.leftNav = "user";
    this.contentNav = {
      name: '用户',
      url: siteUrl('user')
    }
    
    let userModel = this.model("user");
    
    if(this.isPost()){
      
      let id = this.post('id');
 
      let editInfo = {
        name: this.post('name'),
      };
      
      let pwd = this.post('pwd');
      let pwdInfo = {};
      if( pwd ){
        pwdInfo = await userModel.generatePwd(pwd);
        editInfo.pwd = pwdInfo.pwd;
        editInfo.salt = pwdInfo.salt;
      }
      
      await userModel.editInfoById(id, editInfo);
      await this.redirect(siteUrl('user'));
      
    }else{
      let id = this.get('id');
      let user = await userModel.getInfoByUid(id);

      this.assign({
        info: user
      });
      this.display();
    }    
  }
  
  
}