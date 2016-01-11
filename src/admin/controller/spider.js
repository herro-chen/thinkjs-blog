'use strict';

import superagent from "superagent";
import cheerio from "cheerio";
import async from "async";
import iconv from "iconv-lite";
import mkdirp from 'mkdirp';
import moment from 'moment';
import fs from "fs"; 

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    
    //本地存储目录
    let path = '/static/upload/' + moment(new Date).format("YYYY") + '/' + moment(new Date).format("MM") + '/';
    let dir = './www/' + path;    
    mkdirp(dir, function(err){
      if(err) console.log(err);
    });
    
    let url = 'http://meizit.com/home/index/index/p/10';//最后一次
    let download = function(url, dir, filename){
      let stream = fs.createWriteStream(dir + filename);
      return superagent.get(url).pipe(stream);
    }
    
    let setName = function(picSrc){
      return Math.floor(Math.random() * 100000) + picSrc.substr(-4, 4);
    }
    
    superagent.get(url)
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
      .end(function(err, res){
        if(err){
          return console.error(err);
        }
        let $ = cheerio.load(res.text);
        let items = [];
        let model = think.model("article", think.config("db"));
        $('a[class="gitem"]').each(async function(){
          let href = 'http://meizit.com' + $(this).attr('href');
          let title = $(this).find('img').attr('title');
          let imgUrl = $(this).find('img').attr('src');
          let info = await model.where({soucre: href}).find();
          if( ! info){
            items.push({
                title: title,
                imgUrl: imgUrl,
                href: href
            });           
          }
        })
        
        let concurrencyCount = 0;
        let fetchUrl = function(item, callback){
          let startTime = new Date().getTime();
          concurrencyCount++;
          superagent.get(item.href)
            .end(function(err, res){
              if(err){
                return console.error(err);
              }
              
              //处理文档
              let $ = cheerio.load(res.text);
              let content = $('.content').html();
              console.log(content);
              let thumbnailName = setName(item.imgUrl);
              
              download(item.imgUrl, dir, thumbnailName);//下载缩略图片
              let thumbnail = path + thumbnailName;
              
              //下载图片替换路径
              $('.content img').each(function(){
                let picSrc = $(this).attr('src');
                let picName = setName(picSrc);
                download(picSrc, dir, picName);//下载内容图片
                
                let picPath = path + picName;
                //替换文章图片路径
                content = content.replace(picSrc, picPath);
              })
                            
              let info = {
                'cateid': 0,
                'title': item.title,
                'thumbnail': thumbnail,
                'content': content,
                'soucre': item.href
              };
              
              let delay = new Date().getTime() - startTime;
              console.log(item.title, '现在的并发数是' + concurrencyCount + '，正在抓取的是' + item.href + '，耗时' + delay + '毫秒');
              concurrencyCount--;
              callback(null, info);
            })
        }

        //控制并发
        async.mapLimit(items, 3, function(item, callback){
          fetchUrl(item, callback);
        }, function(err, result){
          //入库
          model.addMany(result);
          console.log('final:');
          console.log(result);
        }); 
        
      });
          
    return this.success();
  }
}