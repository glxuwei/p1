const bind = (obj, key) => {
	const fn = obj[key];
	obj[key] = () => {
		return fn.call(obj);
	}
}
const log = console.log.bind(console);


import Interface from '../patterns/Interface';

import branch, {s1, slazy} from '../patterns/singleton';

import {SimpleHandler} from '../patterns/AjaxHandler';
// const target = {
// 	name: 'zs',
// 	aux() {
// 		return this.name;
// 	}
// }
// console.log(target.aux.call({name: 'ww'}));
// bind(target, 'aux');
// console.log(target.aux.call({name: 'ww'}));
