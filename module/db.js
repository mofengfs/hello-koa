//DB库

const MongoClient = require('mongodb').MongoClient;

const Config = require('./config.js');

class Db {

    static getInstance() { // 1.单例  解决多次实例化, 实例不共享的问题

        if(!Db.instance) {

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

    find(collectionName, json) {

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

    update() {

    }

    insert() {

    }

}

module.exports = Db.getInstance()