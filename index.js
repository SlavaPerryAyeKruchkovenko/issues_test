const axios = require("axios");
const nock = require("nock");

const header = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Basic '+ Buffer.from(`kryuch:Qwerty123`).toString('base64')
    }
}
const changeData = {
    "issue": {
        "project_id": 1,
        "subject": "Example",
        "priority_id": 4,
        "custom_fields":
            [
                {
                    "id": 1,
                    "name": "Важность",
                    "value": "Низкая"
                },
                {
                    "id": 2,
                    "name": "Шаги по воспроизведению",
                    "value": "1 отправить запрос http://62.113.99.40/users.xml\r\nс телом {\r\n    \"user\": {\r\n        \"login\": \"suck dick\",\r\n        \"firstname\": \"gay\",\r\n        \"lastname\": \"gay\",\r\n        \"mail\": \"user@example.com\",\r\n        \"password\": \"12345\" \r\n    }\r\n}\r\n2 отправить запрос http://62.113.99.40/users\r\nс тем же телом"
                },
                {
                    "id": 3,
                    "name": "Окружение",
                    "value": "http://62.113.99.40/"
                }
            ],
    }
}
const issueData = {
    "issue": {
        "project_id": "1",
        "subject": "HELLO WORLD",
        "priority_id": 4,
        "custom_fields":
            [
                {
                    "id": 1,
                    "name": "Важность",
                    "value": "Низкая"
                },
                {
                    "id": 2,
                    "name": "Шаги по воспроизведению",
                    "value": "1 отправить запрос"
                },
                {
                    "id": 3,
                    "name": "Окружение",
                    "value": "http://62.113.99.40/"
                }
            ]

    }
}
const createIssue = () => {
    return axios.post("http://62.113.99.40/issues.json",issueData,header);
}
const getIssue = (id) => {
    return axios.get(`http://62.113.99.40/issues.json?issue_id=${id}`,header);
}
const putIssue = () => {
    return axios.put("http://62.113.99.40/issues/131.json",changeData,header);
}
const testRequest = () => {
    createIssue().then(value=>{
        let id = 0;
        if(value.status === 201){
            id = value.data.issue.id
            getIssue(id).then(value=>{
                if(value.status === 200){
                    putIssue().then(value=>{
                        if(value.status === 204){
                            console.log("Тест пройден")
                        }
                        else{
                            console.log("put test failed")
                        }
                    }).catch(()=>{
                        console.log("put test failed")
                    })
                }
            }).catch(()=>{
                console.log("get test failed");
            })
        }
        else{
            console.log("post test failed");
        }
    }).catch(()=>{
        console.log("post test failed");
    });
}
testRequest();