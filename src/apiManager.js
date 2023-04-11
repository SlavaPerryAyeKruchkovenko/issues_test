const axios = require("axios");
const apiManager = {
    header: {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Basic '+ Buffer.from(`kryuch:Qwerty123`).toString('base64')
        }
    },
    createIssue: (issueData) => {
        return axios.post("http://62.113.99.40/issues.json",issueData,apiManager.header);
    },
    getIssue: (id) => {
        return axios.get(`http://62.113.99.40/issues.json?issue_id=${id}`,apiManager.header);
    },
    putIssue: (changeData,id) => {
        return axios.put(`http://62.113.99.40/issues/${id}.json`,changeData,apiManager.header);
    }

}
module.exports = apiManager;