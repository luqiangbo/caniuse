import { get, getCrude } from 'util/req';
import { to } from 'util/index';
// 轮播
export const getBanner = () => get('banner/json');
// 文章列表
export const getArticleList = (int, name) => {
  if (name) {
    return get(`article/list/${int}/json`, { k: name });
  } else {
    return get(`article/list/${int}/json`);
  }
};
// 集合
export const getAllIndex = (int) => {
  return to(Promise.all([getCrude('banner/json'), getCrude(`article/list/${int}/json`), getCrude(`hotkey/json`)]));
};
// 搜索热词
export const getHotkey = () => get(`hotkey/json`);
/// 搜索页面
// 搜索集合
export const getAllSearch = (int, name) => {
  return to(Promise.all([getCrude(`article/list/${int}/json`, { k: name }), getCrude(`hotkey/json`)]));
};