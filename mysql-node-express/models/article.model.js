const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { existColumnSet } = require('../utils/exist.utils');
const Role = require('../utils/userRoles.utils');

class ArticleModel{
    tableName = 'article';
    createArticle = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `INSERT INTO article SET ${columnSet}`
        const result = await query(sql, [...values]);
        // 取得此篇文章的id
        const return_id = await query("SELECT LAST_INSERT_ID()");
        var string=JSON.stringify(return_id)
        var article_id = JSON.parse(string)[0]['LAST_INSERT_ID()']
        return article_id
    }

    updateById = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }

    deleteById = async (id) => {
        console.log(id)
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await query(sql, [id]);
        return result;
    }

    createLikeCount = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `INSERT INTO like_count SET ${columnSet}`
        const result = await query(sql, [...values]);
        return result;
    }

    updateLikeCounts = async (tableName, params,id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE article_id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }

    newSave = async (params) => {
        const sql = `INSERT INTO article_saved (article_id, user_id) VALUES (?,?)`;
        const result = await query(sql, params);
        return result;
    }
    removeSave = async (params) => {
        const { columnSet, values } = existColumnSet(params)
        const sql = `DELETE FROM article_saved WHERE ${columnSet}`; 
        const result = await query(sql, [...values]);
        return result;
    }

    checkIfExist = async (tableName, params) => {
        const { columnSet, values } = existColumnSet(params)
        const sql = `SELECT * FROM ${tableName} WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        // return back the first row (user)
        return result[0];
    }
}

module.exports = new ArticleModel;