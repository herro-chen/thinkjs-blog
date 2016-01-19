'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  
  async __before(){
    
    let uid = await this.session("uid");
    if(typeof(uid) == 'undefined' || ! uid){
      let siteUrl = this.config('siteUrl');
      await this.redirect(siteUrl('index/login')); 
    }
    
    let userModel = this.model('user');
    let userInfo = await userModel.getInfoByUid(uid);

    this.assign("userInfo", userInfo);      

  }
  
}