'use strict';
/**
 * route
 */
export default [
  ["about", "home/single/index"],
  [/^topic(\/)?$/, "home/archive/topic"],
  [/^topic\/([1-9]([0-9]+)?)$/, "home/archive/topic?page=:1"],
  [/^topic\/([A-Za-z]+)$/, "home/archive/topic?cateName=:1"],
  [/^topic\/([A-Za-z]+)\/([1-9]([0-9]+)?)$/, "home/archive/topic?cateName=:1&page=:2"],
  ["magazine", "home/archive/magazine"],
  ["portray", "home/archive/portray"],
  [/^acticle\/([1-9]([0-9]+)?)$/, "home/archive/view?id=:1"],
];