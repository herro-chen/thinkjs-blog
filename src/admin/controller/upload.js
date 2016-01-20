'use strict';

import moment from 'moment';
import fs from "fs"; 

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  
  indexAction(){
    
    
  }
  
  base64Action(){
    
    let base64Date = this.post('base64Date');
    let imgObj = base64Toimg(base64Date);
    if(imgObj.ext === false){
      return this.fail();
    }
    
    let year = moment(new Date).format("YYYY");
    let month = moment(new Date).format("MM");
    let date = moment(new Date).format("DD");    
    
    let pathUrl = '/static/upload/' + year + '/' + month + '/';

    let uploadPath = think.RESOURCE_PATH + pathUrl;
    think.mkdir(uploadPath);
    
    let setName = function(picSrc){
      return date + new Date().getTime() + Math.floor(Math.random() * 100000) + picSrc.substr(-4, 4);
    }

    let basename = setName(new Date().getTime() + imgObj.ext);
    fs.writeFileSync(uploadPath + basename, new Buffer(imgObj.base64, 'base64'));
    let filePath = pathUrl + basename;
    
    return this.success({path: filePath});
    
  }
  
  ckeditorAction(){
    
    let year = moment(new Date).format("YYYY");
    let month = moment(new Date).format("MM");
    let date = moment(new Date).format("DD");    
    
    let pathUrl = '/static/upload/' + year + '/' + month + '/';
    
    let file = think.extend({}, this.file('upload'));
    
    let uploadPath = think.RESOURCE_PATH + pathUrl;
    think.mkdir(uploadPath);
    
    let setName = function(picSrc){
      return date + new Date().getTime() + Math.floor(Math.random() * 100000) + picSrc.substr(-4, 4);
    }
    
    let basename = setName(file.path);
    //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
    fs.renameSync(file.path, uploadPath + basename);
    let filePath = pathUrl + basename;
    let callback = this.get("CKEditorFuncNum");
    
    let html = '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction("' + callback + '", "'+ filePath +'", "");</script>';
    return this.send(html);
  }
}