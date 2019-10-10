


// function version(V) {
//     let curv = V; // 当前版本
//     let lastv = curv; // 上一版本
//     const deal = function () {
//         let [_Major, Minor, Patch] = curv.split('.');
//         Major = _Major.slice(1, _Major.length);
//         lastv = `V${Major}.${Minor}.${Patch}`;
//         return {
//             Major, Minor, Patch
//         }
//     }
//     return {
//         patch: () => {
//             let obj = deal();
//             obj.Patch++;
//             curv =  `V${obj.Major}.${obj.Minor}.${obj.Patch}`;
//             return curv;
//         },
//         minor: () => {
//             let obj = deal();
//             obj.Minor++;
//             curv =  `V${obj.Major}.${obj.Minor}.0`;
//             return curv;
//         },
//         major: () => {
//             let obj = deal();
//             obj.Major++;
//             curv =  `V${obj.Major}.0.0`;
//             return curv;
//         },
//         rollback: () => {
//             return lastv;
//         }
//     }
// }
// let fn = version('V0.11.12')
// console.log(fn.patch()) // return => V0.11.13
// console.log(fn.minor()) // return => V0.12.0
// console.log(fn.major()) // return => V1.0.0
// fn.rollback()


// 需求：写一个方法，可以利用字符串路径获取对象集合的值，当值不存在时返回错误信息

// function fun() {

//     return {
//         get: (obj,path) => {
//             let pathArr = path.split('.');// 分割子级
//             for(p in pathArr){
//                 console.log(p);
//             }
//             return [{},{}]
//         }
//     }
// }

// function fn() {
// }
// fn.prototype = {
//     get: function () {
//         console.log("hello")
//     }
// }
// fn.get();
// let object = { 'a': [{ 'b': { 'c': 3 } }] };
let object = { a: [{ b: { c: 3 } }] };
  const fn = {
    get(obj, path) {
      let pathItem = path.split(".");
      let data = obj;
      for (let i = 0; i < pathItem.length; i++) {
        let item = pathItem[i].replace(/\[|\]/g, "").split("");
        for (let j = 0; j < item.length; j++) {
          try {
            data = data[item[j]];
          } catch (error) {
            return [`Is err about ${pathItem[i - 1]}`, null];
          }
        }
      }
      return [null, data];
    }
  };

let [err, result] = fn.get(object, 'a[0].b.c');
console.log(err, result); // => null, 3

[err, result] = fn.get(object, 'a[0].d.c');
console.log(err, result); // => Is err about 'd', null

// function Person(name) {

//     const that = this;
//     const s = seconds => new Promise((resolve, reject) => {
//         setTimeout(function () {
//             resolve(this);
//         }, parseInt(seconds) * 1000);
//     });
//     if (this.isSleep)
//         console.log("Hi! This is " + name + ' !');

//     this.sleep = function (seconds) {
//         that.isSleep = true;
//         that.sleepTime = seconds;
//         console.log("等待" + seconds + "秒..");
//         return this;
//     }
//     this.clear = function () {
//         this.isSleep = false;
//         this.sleepTime = 0;
//     }
//     this.eat = function (what) {
//         const that = this;
//         if (this.isSleep) s(this.sleepTime).then(() => {
//             console.log("eat " + what + "!");
//             that.clear();
//             return this;
//         }).catch(() => { console.log('err'); return this; })
//         else
//             console.log("eat " + what + "!"); return this;
//     }
//     this.sleepFirst = function () {
//         console.log("sleepFirst"); return this;
//     }
//     return this;
// }
// Person.prototype = new Person();


// Person("Li");
// 输出： Hi! This is Li!

// Person("Dan").sleep(1).eat("dinner");
// Person("Dan").sleep(1).eat("dinner");
// Person("Dan").sleep(1).eat("dinner");
// 输出：
// Hi! This is Dan!
// 等待10秒..
// Wake up after 10
// Eat dinner~

// Person("Jerry").eat("dinner").eat("supper");
// 输出：
// Hi This is Jerry!
// Eat dinner~
// Eat supper~

// Person("Smith").sleepFirst(5).eat("supper");
// 输出：
// 等待5秒
// Wake up after 5
// Hi This is Smith!
// Eat supper