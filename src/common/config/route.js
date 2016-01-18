'use strict';
/**
 * route
 */
export default [
  ["about", "home/single/index"],
  ["rss", "home/article/rss"],
  ["search", "home/article/search"],
  [/^topic\/([1-9]([0-9]+)?)$/, "home/article/topic?page=:1"],
  ["topic", "home/article/topic"],
  [/^tag\/([%A-Za-z0-9\u4e00-\u9fa5]+)$/, "home/article/topic?tag=:1"],
  [/^tag\/([%A-Za-z0-9\u4e00-\u9fa5]+)\/([1-9]([0-9]+)?)$/, "home/article/topic?tag=:1&page=:2"],
  [/^magazine\/([1-9]([0-9]+)?)$/, "home/article/magazine?page=:1"],
  ["magazine", "home/article/magazine"],  
  [/^portray\/([A-Za-z]+)$/, "home/article/portray?slug=:1"],
  [/^portray\/([A-Za-z]+)\/([1-9]([0-9]+)?)$/, "home/article/portray?slug=:1&page=:2"],
  [/^portray\/([1-9]([0-9]+)?)$/, "home/article/portray?page=:1"],
  ["portray", "home/article/portray"],
  [/^acticle\/([1-9]([0-9]+)?)$/, "home/article/view?id=:1"],
  
  [/^admin\/article\/index\/([1-9]([0-9]+)?)$/, "admin/article/index?page=:1"],
  [/^admin\/article\/edit\/([1-9]([0-9]+)?)$/, "admin/article/edit?id=:1"],
  [/^admin\/taxonomy\/index\/([1-9]([0-9]+)?)$/, "admin/taxonomy/index?page=:1"],
  
];