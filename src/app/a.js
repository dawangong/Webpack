import test from '../static/images/test.jpg'
import create from './create';
import './a.less'
import data from './data.json'
import _ from 'lodash';

/* 懒加载 默认触发加载 */ // 最简
// 更改打包后的name import (/* webpackChunkName:"lodash" */ 'lodash');
// 网络空闲加载（进行缓存） import (/* webpackPrefetch:"lodash" */ 'lodash'); // 最佳
// 和主文件一起加载（进行缓存） import (/* webpackPreload:"lodash" */ 'lodash');// 不推荐

create('img', 'img', test);

console.log(data , 'json');
