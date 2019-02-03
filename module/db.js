//DB库

const MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectID;

const Config = require('./config.js');

class Db {

    static getInstance() { // 1.单例  解决多次实例化, 实例不共享的问题

        if (!Db.instance) {

            Db.instance = new Db()

        }

        return Db.instance

    }

    constructor() {

        this.dbClient = ''; /**属性 db对象 */

        this.connect(); /**实例化的时候就连接数据库 */

    }

    connect() { /**连接数据库 */

        return new Promise((resolve, reject) => {

            if (!this.dbClient) { // 2.这里的判断是解决数据库多次连接的问题

                MongoClient.connect(Config.dbUrl, (err, client) => {

                    if (err) {

                        reject(err)

                    } else {

                        var db = client.db(Config.dbName)

                        this.dbClient = db;

                        resolve(this.dbClient)

                    }

                })

            } else {

                resolve(this.dbClient)

            }

        })

    }

    find(collectionName, json) { /**查找数据 */

        return new Promise((resolve, reject) => {

            this.connect().then((db) => {

                var result = db.collection(collectionName).find(json)

                result.toArray((err, docs) => {

                    if (err) {

                        reject(err)

                    } else {

                        resolve(docs)

                    }

                })

            })

        })

    }

    insert(collectionName, json) { /**增加数据 */

        return new Promise((resolve, reject) => {

            this.connect().then((db) => {

                db.collection(collectionName).insertOne(json, (err, result) => {

                    if (err) {

                        reject(err)

                    } else {

                        resolve(result)

                    }

                })

            })

        })

    }

    update(collectionName, json1, json2) { /**更改数据 */

        return new Promise((resolve, reject) => {

            this.connect().then((db) => {

                db.collection(collectionName).updateOne(json1, {

                    $set: json2

                }, (err, result) => {

                    if (err) {

                        reject(err)

                    } else {

                        resolve(result)

                    }

                })

            })

        })

    }


    remove(collectionName, json) { /**删除数据 */

        return new Promise((resolve, reject) => {

            this.connect().then((db) => {

                db.collection(collectionName).removeOne(json, (err, result) => {

                    if (err) {

                        reject(err)

                    } else {

                        resolve(result)

                    }

                })

            })

        })

    }

    getObjectID(id) { /**mongodb里面查询 _id 把字符串转换成对象 */

        return new ObjectID(id) 

    }

}

module.exports = Db.getInstance()