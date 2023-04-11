const apiManager = require("./apiManager");

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
};
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
};

describe("issue test", () => {
    let id = 0;
    test("test create issue", async () => {
        const value = await apiManager.createIssue(issueData)
        id = value.data.issue.id
        expect(value.data.issue.id > 0).toEqual(true)
        expect(value.status).toBe(201)
    });
    test("test get issue", async () => {
        const value = await apiManager.getIssue(id)

        expect(value.status).toBe(200)
    });
    test("test change issue", async () => {
        id = id===0?131:id;
        const value = await apiManager.putIssue(changeData,id);
        expect(value.statusText).toEqual('No Content');
        expect(value.data).toEqual("");
        expect(value.status).toBe(204);
    })
})