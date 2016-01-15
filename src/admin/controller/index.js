'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let uid = await this.session("uid");
    if( ! uid) this.http.redirect('/admin/index/login'); 
    //auto render template file index_index.html
    return this.display();
  }
  
  loginAction(){
    return this.display();
  }
  
}