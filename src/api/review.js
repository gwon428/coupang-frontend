import axios from "axios";

// 토큰 localstorage에 담기
// const token = localStorage.getItem("token");
const getToken = () => {
    return localStorage.getItem("token");
}

// 인증이 필요없는 RESTful API 가져올 때 기본 루트
const instance = axios.create({
    baseURL: "http://localhost:8080/api/public/",
});

// 인증이 필요한 RESTful API 가져올 때 기본 루트
const authorize = axios.create({
    baseURL: "http://localhost:8080/api/",
    // headers:{
    //     Authorization: `Bearer ${token}`,
    // }
});

// 요청할 때 사용하겠다...? 머? [240418]
authorize.interceptors.request.use((config) => {
    const token = getToken();
    if(token){{
        config.headers.Authorization = `Bearer ${token}`;
    }}
    return config;
})

/*
[POST] http://localhost:8080/api/review
인증 O, RequestBody로 데이터 전송
*/
// 리뷰 추가
export const addReview = async(data) => {
    return await authorize.post("review", data);
};

/*
[GET] http://localhost:8080/api/public/product/10/review
인증 X, 경로에 상품 코드 보내야 되는 상황
*/
// 전체 가져오기
export const getReview = async(code) => {
    return await instance.get("product/" + code + "/review");    
};

export const updateReview = async(data) => {
    return authorize.put("review", data);
}

export const delReview = async(code) => {
    return await authorize.delete("review/" + code);
}