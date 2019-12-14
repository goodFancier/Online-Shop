import {API_BASE_URL, ACCESS_TOKEN} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getAllUsers() {
    return request({
        url: API_BASE_URL + "/users/getAllUsers",
        method: 'GET'
    });
}

export function getLastParticipants() {
    return request({
        url: API_BASE_URL + "/message/getLastDialogParticipants",
        method: 'GET'
    })
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserBucketGoods(userId) {
    return request({
        url: API_BASE_URL + "/getUserGoods?userId=" + userId,
        method: 'GET'
    });
}

export function getCatalogueOfGoods() {
    return request({
        url: API_BASE_URL + "/getCatalogueOfGoods",
        method: 'GET'
    });
}


export function addToBucket(userId, goodId) {
    return request({
        url: API_BASE_URL + "/addToBucket?userId=" + userId + "&goodId=" + goodId,
        method: 'GET'
    });
}

export function deleteFromUserBucket(userId, goodId) {
    return request({
        url: API_BASE_URL + "/deleteFromUserBucket?userId=" + userId + "&goodId=" + goodId,
        method: 'GET'
    });
}

export function getBucketTotalSum(userId) {
    return request({
        url: API_BASE_URL + "/getBucketTotalSum?userId=" + userId,
        method: 'GET'
    });
}

export function getRandomGoods() {
    return request({
        url: API_BASE_URL + "/getRandomGoods",
        method: 'GET'
    });
}

export function loadPublicOffers() {
    return request({
        url: API_BASE_URL + "/getPublicOffers",
        method: 'GET'
    });
}

