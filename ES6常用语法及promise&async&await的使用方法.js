//1.模板字符串------------------------------------
let name = "张三";
console.log(`${name}是个共匪`); //张三是个共匪

//2.方法的简写 属性的简写--------------------------------
//以前的写法
var name = "张三";

var app = {
    name: name,
    run: function () {
        console.log(this.name + '在跑步')
    }
};
console.log(app.name); //张三
app.run(); //张三在跑步

//ES6的简写
var app = {
    name,
    run() {
        console.log(`${this.name}在跑步`)
    }
};
console.log(app.name); //张三
app.run(); //张三在跑步

//3.箭头函数 this指向上下文------------------------------------------------
//以前的写法
setTimeout(function () {
    console.log('执行')
}, 1000)
//ES6写法
setTimeout(() => {
    console.log('执行')
}, 1000)

/*4.回调函数 处理异步----------------------------------------------------
   callback 实参
   name 形参
**/
function getData(callback) {
    //ajax
    setTimeout(function () {
        var name = "张三";
        callback(name)
    }, 1000)
}
//外部获取异步方法里面的数据
getData(function (data) {
    console.log(data); //张三
})

/*5.Promise 处理异步 -----------------------------------------------------------

resolve 成功的回调
reject 失败的回调

var p = new Promise(functionName) 
p.then((data) => { console.log(data) })

**/
var p = new Promise(function (resolve, reject) {

    setTimeout(() => {
        var name = "张三";

        if (Math.random() < 0.8) {
            resolve(name)
        } else {
            reject('失败')
        }

    }, 1000)
})
p.then((data) => {
    console.log(data);//张三
})

/*6.async await 处理异步-------------------------------------------------------------------------
async 是异步的简写, 而 await 可以认为是 async wait 的简写.
所以很好理解 async 用于声明一个 function 是异步的, 
而 await 用于等待一个异步方法执行完成.
**/

//普通方法
function getData() {
    return '这是一个数据'
}
console.log(getData()) //这是一个数据

//async 是让方法变异步
async function getData() {
    return '这是一个数据'
}
console.log(getData()); // Promise {'这是一个数据'}

//如何获取 async 异步方法里面的数据的第一种方法
async function getData() {
    return '这是一个数据'
}

var p = getData();
p.then((data) => {
    console.log(data)
})

/* 获取 async 异步方法里面的数据的第二种方法 await
    await 是等待异步方法执行完成, 可以获取异步方法里面的数据, 但是必须得使用在异步方法里面
**/
async function getData() {
    return '这是一个数据'
}

async function test() {
    var d = await getData();
    console.log(d)
}

test();//这是一个数据

//await 阻塞的功能, 把异步改成一个同步
async function getData() {
    console.log(2);
}

async function test() {

    console.log(1);

    var d = await getData();
    console.log(d);

    console.log(3)

}

test();// 1 2 3

// async 定义的方法返回的是Promise对象
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var username = "张三"
            resolve(username);
        }, 1000)
    })
}

async function test() {
    var data = await getData();
    console.log(data);
}

test(); //张三



