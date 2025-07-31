import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 50,
    duration: "30s",
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};


export default function () {

    // Testing Get Users
    let res = http.get('http://localhost:3000/users');
    check(res, {
        'GET /users status is 200': (r) => r.status === 200,
    });


    // Testing Add user api
    const payload = JSON.stringify({name:
        `User_${Math.random().toString(36).substring(7)}`});
    
    const headers = {'Content-Type': 'application/json'};

    let postRes = http.post('http://localhost:3000/users', payload, {headers});
    check(postRes, {
        'POST /users status is 201': (r) => r.status === 201,
    });


    // Testing Get Newly Created Api by Id
    if (postRes.status === 201 ){
        const userId = JSON.parse(postRes.body).id;
        let getUserRes = http.get(`http://localhost:3000/users/${userId}`);
        check(getUserRes, {
            'GET /users/:id status is 200': (r) => r.status === 200,
        })
    }

    sleep(1);  // Pause for 1 second before next iteration

}

