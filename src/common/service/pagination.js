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
    let tagOpen = pageConfig.tagOpen ? pageConfig.tagOpen : "";
    let tagClose = pageConfig.tagClose ? pageConfig.tagClose : "";
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
    let links = tagOpen + '<a href="'+ baseUrl +'1" title="&laquo;" class="number">&laquo;</a>' + tagClose;
    if(currentPage != 1) links += tagOpen + '<a href="'+ baseUrl + (currentPage - 1) + '" title="prev" class="number">&lt;</a>' + tagClose;
    pages.forEach(function(page){
      if(page == currentPage){
        links += tagOpen + '<span class="number current">'+ page +'</span>' + tagClose;
      }else{
        links += tagOpen + ' <a href="'+ baseUrl + page +'" class="number">'+ page +'</a>' + tagClose;
      }
    })
    if(currentPage != totalPages) links += tagOpen + '<a href="'+ baseUrl + (currentPage + 1) + '" title="next" class="number">&gt;</a>' + tagClose;
    links += tagOpen + '<a href="'+ baseUrl + totalPages +'" title="&raquo;" class="number">&raquo;</a>' + tagClose;
    return links;
  }
  
}