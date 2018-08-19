import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

var resource = Vue.resource;
Vue.http.options.root = window.App.setting.httpRoot;

var get = Vue.http.get;
var post = Vue.http.post;

/**
 * 重写get请求
 * @param url
 * @param option
 */
Vue.http.get = function (url, option,) {
  //TODO do something i want
  if (url.substr(0, 1) == '/') {
    url = url.substr(1);
  }
  url = '/nodeOne/' + url;
  return post.call(this, url, option);
};
/**
 * 重写post请求
 * @param url
 * @param body 请求参数
 * @param config 配置参数 参考https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
 * @returns {*|void}
 */
Vue.http.post = function (url, body, option) {
  //TODO do something i want
  if (url.substr(0, 1) == '/') {
    url = url.substr(1);
  }
  url = '/nodeOne/' + url;
  return post.call(this, url, body, option);
};

//test
// Vue页面中 this.$http.get('test',{},{a:1});
var p1 = Vue.http.get('getTest');
p1.then(function (resp) {
  console.log(resp);
}).catch(function (resp) {
  console.log(resp);
}).finally(function (resp) {
  console.log(resp);
});

var p2 = Vue.http.post('postTest', {data: 'testData'});

p2.then(function (resp) {
  console.log(resp);
}).catch(function (resp) {
  console.log(resp);
}).finally(function (resp) {
  console.log(resp);
});
