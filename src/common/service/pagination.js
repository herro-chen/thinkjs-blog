'use strict';

export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(...args){
    super.init(...args);
  }
  
  initialize(config){
    this.config = config;
    return this;
  }
  
  createLinks(){
    let config = this.config;
    let totalPages = config.totalPages;
    if(totalPages <= 1) return '';
    let numsPerPage = config.numsPerPage ? config.numsPerPage : 10;
    let currentPage = config.currentPage ? config.currentPage : 1;
    let pages = [];
    let nextPage = currentPage;
    let i = 5;
    while(nextPage <= totalPages && i > 0){
      pages.push(nextPage);
      nextPage = nextPage + 1;
      i = i - 1;
    }
    let prevPage = currentPage;
    while(prevPage > 1 && i > 0){
      prevPage = prevPage - 1;
      pages.unshift(prevPage);
      i = i - 1;      
    }
    let baseUrl = config.baseUrl;//构造路径
    let links = '<a href="'+ baseUrl +'1" title="&laquo;" class="number">&laquo;</a>';
    pages.forEach(function(page){
      if(page == currentPage){
        links += '<span class="number current">'+ page +'</span>';
      }else{
        links += ' <a href="'+ baseUrl + page +'" class="number">'+ page +'</a>';
      }
    })
    links += '<a href="'+ baseUrl + totalPages +'" title="&raquo;" class="number">&raquo;</a>';
    return links;
  }
  
}