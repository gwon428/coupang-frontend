import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";

// createAsyncThunk (액션, 실행함수)
export const asyncLogin = createAsyncThunk("user/login", async(data) => {
    const response = await login(data);
    return response.data;
})

const user = createSlice({
    name: "user",
    initialState: {},
    // reducers: {} : 보통 함수
    reducers: {
        userSave: (state, action) => {
            return action.payload;
        },
        userLogout: (state, action) => {
            return {};
        }
    },

    // axios 에 있는 거 가져오기 위해 createAsyncThunk
    // extraReducers는 reducers 의 아래에 위치해야 함.
    extraReducers: (builder) => {
        // 액션 함수(asyncLogin)가 성공/실패/로딩중일 때
        // 성공 : fulfilled
        // 실패 : rejected
        // 로딩중 : pending
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            // action의 payload를 state에 담기
            // console.log(action.payload);
            const result = action.payload;
            // redux 특성상 새로고침하면 사라지기 때문에 localStorage에 저장
            localStorage.setItem("token", result.token);
            // 개발하기 수월하도록
            localStorage.setItem("user", JSON.stringify(result));
            return result;
        });
    },
});

export default user;
export const {userSave, userLogout} = user.actions;