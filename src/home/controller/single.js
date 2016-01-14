'use strict';

import Base from './base.js';

export default class extends Base {
  async __before(){
    let tagCloud = await this.model("taxonomy").getHotTag();
    let newList = await this.model("article").getNewList();
    this.assign({
      "tagCloud": tagCloud,
      "newList": newList
    });
  }  
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.aboutAction();
  }
  
  async aboutAction(){
    this.navType = "about";
    this.tagCloud = await this.model("taxonomy").getHotTag();
    this.assign({
      title: "关于猫女",
      content: '<p><span style="color:#5c5c5c;">一直以来，我们想打造这样一个产品，她简单，干净，聪明，熟悉每个用户的脾气和喜好。她知道你是<a href=""><span style="color: #5c5c5c;">森女</span></a>，崇尚简单。她知道你是<a href=""><span style="color: #5c5c5c;">萝莉</span></a>，追求可爱。她知道你是OL，要正式优雅……心情不好了，她会展示给你一个可爱萌物，让你开怀一笑。有约会了，她会为你准备一套完美穿搭，让你幸福如花。</span></p>\
<p><span style="color: #5c5c5c;">在这，发现惊喜。在这，和美物不期而遇。一样的购物不一样的体验，猫女网从文艺小清新开始。</span></p>\
<p><span style="color: #c0c0c0;">—————————————————————————————</span></p>\
<p><span style="color: #5c5c5c;"><strong>联系我们：</strong></span></p>\
<p><strong>关注我们：</strong></p>\
<p>夜深人静，无聊却不想睡觉，想找个人聊天，QQ上的头像却是灰灰的一片。</p>\
<p>你，是不是有些孤单？</p>\
<p>来，到微信和我们做个朋友吧！</p>\
<p>陪你聊天讲笑话，教你穿衣打扮成，快来吧，猫女网一直等着你哦！</p>'
    });
    return this.display("default");
  }
  
}