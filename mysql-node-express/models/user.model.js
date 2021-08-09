const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { existColumnSet } = require('../utils/exist.utils');
const Role = require('../utils/userRoles.utils');
class UserModel {
    findUser = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        console.log(columnSet)
        console.log(values)
        const sql = `SELECT * FROM account WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        var string=JSON.stringify(result)
        var user = JSON.parse(string)
        console.log(user)
        // return back the first row (user)
        return user[0];
    }

    tableName = 'article';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // createArticle = async (params) => {
    //     const { columnSet, values } = multipleColumnSet(params)
    //     const sql = `INSERT INTO article SET ${columnSet}`
    //     const result = await query(sql, [...values]);
    //     // 取得此篇文章的id
    //     const return_id = await query("SELECT LAST_INSERT_ID()");
    //     var string=JSON.stringify(return_id)
    //     var article_id = JSON.parse(string)[0]['LAST_INSERT_ID()']
    //     return article_id
    // }

    // createLikeCount = async (params) => {
    //     const { columnSet, values } = multipleColumnSet(params)
    //     const sql = `INSERT INTO like_count SET ${columnSet}`
    //     const result = await query(sql, [...values]);
    //     return result;
    // }

    // updateById = async (params, id) => {
    //     const { columnSet, values } = multipleColumnSet(params)
    //     const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
    //     const result = await query(sql, [...values, id]);
    //     return result;
    // }

    // deleteById = async (id) => {
    //     console.log(id)
    //     const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    //     const result = await query(sql, [id]);
    //     return result;
    // }
    // updateLikeCounts = async (tableName, params,id) => {
    //     const { columnSet, values } = multipleColumnSet(params)
    //     const sql = `UPDATE ${tableName} SET ${columnSet} WHERE article_id = ?`;
    //     const result = await query(sql, [...values, id]);
    //     return result;
    // }
    // newSave = async (params) => {
    //     const sql = `INSERT INTO article_saved (article_id, user_id) VALUES (?,?)`;
    //     const result = await query(sql, params);
    //     return result;
    // }
    // removeSave = async (params) => {
    //     const { columnSet, values } = existColumnSet(params)
    //     const sql = `DELETE FROM article_saved WHERE ${columnSet}`; 
    //     const result = await query(sql, [...values]);
    //     return result;
    // }
    newFollow = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `INSERT INTO follower SET ${columnSet}`; //(article_id, user_id) VALUES (?,?)
        const result = await query(sql, [...values]);
        // console.log(columnSet)
        // console.log(result)
        return result;
    }
    removeFollow = async (params) => {
        const { columnSet, values } = existColumnSet(params)
        const sql = `DELETE FROM follower WHERE ${columnSet}`; //(article_id, user_id) VALUES (?,?)
        const result = await query(sql, [...values]);
        // console.log(sql)
        // console.log(values)
        return result;
    }
    checkIfExist = async (tableName, params) => {
        const { columnSet, values } = existColumnSet(params)
        const sql = `SELECT * FROM ${tableName} WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        // return back the first row (user)
        return result[0];
    }
    // compare_id = async (params) => {
    //     const { columnSet, values } = multipleColumnSet(params)
    //     // 取得傳入文章id
    //     const sql = `SELECT * FROM ${this.tableName}
    //     WHERE ${columnSet}`;
    //     const result = await query(sql, [...values]);
    //     var string=JSON.stringify(result)
    //     var data = JSON.parse(string)
    //     var article_id = data[0]["id"]
    //     console.log(article_id)

    //     // 取得account_id
    //     console.log()
    //     // return back the first row (user)
    //     return 1;
    // }

}

module.exports = new UserModel;