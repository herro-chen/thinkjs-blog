'use strict';

/**
 * cache configs
 */
export default {
  type: "file", //缓存方式
  prefix: "thinkjs_", //缓存名称前缀
  timeout: 6 * 3600, //6 hours
  path: think.getPath('common', 'runtime') + "/cache", //文件缓存模式下缓存内容存放的目录
  path_depth: 2, //子目录深度
  file_ext: ".json" //缓存文件的扩展名
};