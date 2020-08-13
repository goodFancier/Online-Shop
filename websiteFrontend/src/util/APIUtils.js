import {
    API_BASE_URL,
    ACCESS_TOKEN,
    RETAILERS_LIST_SIZE,
    RETAILERS_LIST_SORT, RETAILERS_LIST_SORT_ORDER
} from '../constants';

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

export function requestSmsCode(smsRequest) {
    return request({
        url: API_BASE_URL + "/auth/requestSmsCode",
        method: 'POST',
        body: JSON.stringify(smsRequest)
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

export function getUserBucketGoods() {
    return request({
        url: API_BASE_URL + "/getUserGoods",
        method: 'POST'
    });
}

export function getCatalogueOfGoods() {
    return request({
        url: API_BASE_URL + "/getCatalogueOfGoods",
        method: 'GET'
    });
}


export function addToBucket(goodId) {
    return request({
        url: API_BASE_URL + "/addToBucket?goodId=" + goodId,
        method: 'GET'
    });
}

export function deleteFromUserBucket(goodId) {
    return request({
        url: API_BASE_URL + "/deleteFromUserBucket?goodId=" + goodId,
        body: JSON.stringify(goodId),
        method: 'Post'
    });
}

export function setGoodQuantity(setGoodQuantityRequest) {
    return request({
        url: API_BASE_URL + "/setGoodQuantity",
        body: JSON.stringify(setGoodQuantityRequest),
        method: 'Post'
    });
}

export function getBucketTotalSum(userId) {
    return request({
        url: API_BASE_URL + "/getBucketTotalSum?userId=" + userId,
        method: 'GET'
    });
}

export function loadPublicOffers() {
    return request({
        url: API_BASE_URL + "/getPublicOffers",
        method: 'GET'
    });
}

export function getOfferById(offerId) {
    return request({
        url: API_BASE_URL + "/getOfferById?offerId=" + offerId,
        method: 'GET'
    });
}

export function getGoodById(goodId) {
    return request({
        url: API_BASE_URL + "/getGoodById?goodId=" + goodId,
        method: 'GET'
    });
}

export function createOrder(createOrderRequest) {
    return request({
        url: API_BASE_URL + "/order/createOrder",
        method: 'POST',
        body: JSON.stringify(createOrderRequest)
    });
}

export function getGoodsByRetailers(retailersId, page, size, sort, sortOrder, filterValue) {
    page = page || 0;
    size = size || RETAILERS_LIST_SIZE;
    sort = sort || RETAILERS_LIST_SORT;
    sortOrder = sortOrder || RETAILERS_LIST_SORT_ORDER;

    return request({
        url: API_BASE_URL + "/getGoodsByRetailers?retailersId=" + retailersId + "&page=" + page + "&size=" + size + "&sortBy=" + "createdAt" + "&sortOrder=" + "descend" + "&filterValue=" + filterValue,
        method: 'GET'
    });
}

// Ритейлер
export function getAllRetailers(page, size, sort, sortOrder, city) {
    page = page || 0;
    size = size || RETAILERS_LIST_SIZE;
    sort = sort || RETAILERS_LIST_SORT;
    sortOrder = sortOrder || RETAILERS_LIST_SORT_ORDER;
    city = city || "";

    return request({
        url: API_BASE_URL + "/retailers/all?page=" + page + "&size=" + size + "&sortBy=" + sort + "&sortOrder=" + sortOrder + "&city=" + city,
        method: 'GET'
    });
}


export function getAllCity() {
    return request({
        url: API_BASE_URL + "/retailers/allCity",
        method: 'GET'
    })
}

//Ордер
export function getAllUserOrders(page, size, sort, sortOrder, boolean) {
    page = page || 0;
    size = size || RETAILERS_LIST_SIZE;
    sort = sort || RETAILERS_LIST_SORT;
    sortOrder = sortOrder || RETAILERS_LIST_SORT_ORDER;
    // boolean = boolean || true;

    return request({
        url: API_BASE_URL + "/order/getAllUserOrders?page=" + page + "&size=" + size + "&sortBy=" + sort + "&sortOrder=" + sortOrder + "&isActive=" + boolean,
        method: 'GET'
    });
}

export function updateOrder(item) {
    return request({
        url: API_BASE_URL + "/order/updateOrder",
        method: 'POST',
        body: JSON.stringify(item)
    });
}

export function getDeliveryPrice(address) {
    return request({
        url: API_BASE_URL + "/order/getDeliveryPrice",
        method: 'POST',
        body: address
    });
}

export function saveUserProfile(updateProfileRequest) {
    return request({
        url: API_BASE_URL + "/users/saveUserProfile",
        method: 'POST',
        body: JSON.stringify(updateProfileRequest)
    });
}

export function saveCity(city) {
    return request({
        url: API_BASE_URL + "/users/saveCity",
        method: 'POST',
        body: city
    });
}

export function repeatOrder(goodList) {
    return request({
        url: API_BASE_URL + "/order/repeatOrderRequest",
        method: 'POST',
        body: JSON.stringify(goodList)
    });
}

export function getPayUrl(item) {
    return request({
        url: API_BASE_URL + "/order/getPayUrl",
        method: 'POST',
        body: JSON.stringify(item)
    });
}




