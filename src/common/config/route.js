'use strict';
/**
 * route
 */
export default [
  ["about", "home/single/index"],
  ["rss", "home/archive/rss"],
  ["topic", "home/archive/topic"],
  [/^topic\/([1-9]([0-9]+)?)$/, "home/archive/topic?page=:1"],
  [/^tag\/([A-Za-z0-9\u4e00-\u9fa5]+)$/, "home/archive/topic?tag=:1"],
  [/^tag\/([A-Za-z0-9\u4e00-\u9fa5]+)\/([1-9]([0-9]+)?)$/, "home/archive/topic?tag=:1&page=:2"],
  ["magazine", "home/archive/magazine"],
  [/^portray\/([A-Za-z]+)$/, "home/archive/portray?slug=:1"],
  [/^portray\/([A-Za-z]+)\/([1-9]([0-9]+)?)$/, "home/archive/portray?slug=:1&page=:2"],
  ["portray", "home/archive/portray"],
  [/^portray\/([1-9]([0-9]+)?)$/, "home/archive/portray?page=:1"],
  [/^acticle\/([1-9]([0-9]+)?)$/, "home/archive/view?id=:1"],
];