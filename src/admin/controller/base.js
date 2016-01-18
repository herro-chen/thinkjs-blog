'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  async __before(){
    
    let uid = await this.session("uid");
    if( ! uid) this.http.redirect(config.siteUrl('index/login')); 
    
    let userModel = this.model('user');
    let userInfo = await userModel.getInfoByUid(uid);

    this.assign({
      "userInfo": userInfo
    });
  }
  
}