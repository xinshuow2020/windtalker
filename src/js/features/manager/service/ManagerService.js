/**
 *  Defines the ManagerService
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var ManagerService = function(utils, DbService) {

    this.getInfos = function(userId) {

        return utils.promise(function(resolve, reject) {

            DbService.getSecretDb()
                .find({userId: utils.encryptTxt(userId)})
                .sort({updateDate: -1})
                .exec(function(err, docs) {
                    if (err) {
                        reject('读取秘密信息失败');
                        return;
                    }

                    var infos = docs.map(function(doc) {
                        var info = {
                            id: utils.decryptTxt(doc.id),
                            userId: utils.decryptTxt(doc.userId),
                            name: utils.decryptTxt(doc.name),
                            desc: utils.decryptTxt(doc.desc),
                            createDate: doc.createDate,
                            updateDate: doc.updateDate,
                            items: doc.items.map(function(item) {
                                return {
                                    key: utils.decryptTxt(item.key),
                                    value: utils.decryptTxt(item.value)
                                };
                            })
                        };
                        return info;
                    });

                    resolve(infos);
                });
        });
    };

    this.addInfo = function(info) {

        return utils.promise(function(resolve, reject) {
            var encryptInfo = {
                id: utils.encryptTxt(utils.ID()),
                userId: utils.encryptTxt(info.userId),
                name: utils.encryptTxt(info.name),
                desc: utils.encryptTxt(info.desc),
                createDate: new Date().getTime(),
                updateDate: new Date().getTime(),
                items: info.items.map(function(item) {
                    return {
                        key: utils.encryptTxt(item.key),
                        value: utils.encryptTxt(item.value)
                    };
                })
            };

            DbService.getSecretDb()
                .find({
                    userId: encryptInfo.userId,
                    name: encryptInfo.name
                }, function(err, docs) {
                    if (err) {
                        reject('新增秘密信息失败 ' + err);
                        return;
                    }
                    if (docs.length > 0) {
                        reject('该秘密信息已被注册，请重试');
                        return;
                    }
                    DbService.getSecretDb()
                        .insert(encryptInfo, function(err, doc) {
                            if (err) {
                                reject('新增秘密信息失败 ' + err);
                                return;
                            }
                            var i = {
                                id: utils.decryptTxt(doc.id),
                                userId: utils.decryptTxt(doc.userId),
                                name: utils.decryptTxt(doc.name),
                                desc: utils.decryptTxt(doc.desc),
                                createDate: doc.createDate,
                                updateDate: doc.updateDate,
                                items: doc.items.map(function(item) {
                                    return {
                                        key: utils.decryptTxt(item.key),
                                        value: utils.decryptTxt(item.value)
                                    };
                                })
                            };
                            resolve(i);
                        });

                });
        });
    };
};

module.exports = ['utils', 'DbService', ManagerService];
