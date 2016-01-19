'use strict';

import Base from './base.js';

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    
    this.leftNav = "dashboard";
    
    let uid = await this.session("uid");
    if(typeof(uid) == 'undefined' || ! uid){
      let siteUrl = this.config('siteUrl');
      await this.redirect(siteUrl('index/login')); 
    }
    
    let userModel = this.model('user');
    let userInfo = await userModel.getInfoByUid(uid);
    
    let articleNum = this.model('article').count();
    let taxonomyNum = this.model('taxonomy').count();
    let userNum = userModel.count();
    
    this.assign({
      articleNum: articleNum,
      taxonomyNum: taxonomyNum,
      userNum: userNum,
      userInfo: userInfo
    });
    //auto render template file index_index.html
    return this.display();
  }
  
  async loginAction(){
    if(this.isGet())
    {
      return this.display();
    }
   
    let name = this.post('name');
    let pwd = this.post('pwd');
    let userModel = this.model('user');
    let userInfo = await userModel.getInfoByName(name);
    
    let siteUrl = this.config('siteUrl');
    
    if(think.isEmpty(userInfo))
    {
      await this.redirect(siteUrl('index/login'));   
    }
    
    if(userModel.checkPwd(pwd, userInfo))
    {
      await this.session("uid", userInfo.id);
      await this.redirect(siteUrl('index'));
    }else{
      await this.redirect(siteUrl('index/login'));
    }
    
  }
  
  async logoutAction(){
    let siteUrl = this.config('siteUrl');
    await this.session('uid', '');
    await this.redirect(siteUrl('index/login'));
  }
  
}