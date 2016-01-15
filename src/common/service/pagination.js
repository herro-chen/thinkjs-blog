'use strict';

export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(...args){
    super.init(...args);
  }
  
  initialize(pageConfig){
    this.pageConfig = pageConfig;
    return this;
  }
  
  createLinks(){
    let pageConfig = this.pageConfig;
    let totalPages = pageConfig.totalPages;
    if(totalPages <= 1) return '';
    let numsPerPage = pageConfig.numsPerPage ? pageConfig.numsPerPage : 10;
    let currentPage = pageConfig.currentPage ? pageConfig.currentPage : 1;
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
    let baseUrl = pageConfig.baseUrl;//构造路径
    let links = '<a href="'+ baseUrl +'1" title="&laquo;" class="number">&laquo;</a>';
    if(currentPage != 1) links += '<a href="'+ baseUrl + (currentPage - 1) + '" title="prev" class="number">&lt;</a>';
    pages.forEach(function(page){
      if(page == currentPage){
        links += '<span class="number current">'+ page +'</span>';
      }else{
        links += ' <a href="'+ baseUrl + page +'" class="number">'+ page +'</a>';
      }
    })
    if(currentPage != totalPages) links += '<a href="'+ baseUrl + (currentPage + 1) + '" title="next" class="number">&gt;</a>';
    links += '<a href="'+ baseUrl + totalPages +'" title="&raquo;" class="number">&raquo;</a>';
    return links;
  }
  
}