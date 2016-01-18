'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    
    this.leftNav = "dashboard";
    
    let uid = await this.session("uid");
    if( ! uid) this.http.redirect('/admin/index/login'); 
    
    let userModel = this.model('user');
    let userInfo = await userModel.getInfoByUid(uid);

    this.assign({
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
    if(think.isEmpty(userInfo))
    {
      this.http.redirect('/admin/index/login');   
    }
    
    if(userModel.checkPwd(pwd, userInfo))
    {
      await this.session("uid", userInfo.id);
      this.http.redirect('/admin/index');
    }
    
  }
  
}