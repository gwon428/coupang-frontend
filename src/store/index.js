import { configureStore } from "@reduxjs/toolkit";
import user from "./user";

const store = configureStore({
    // reducer로 user 등록
    reducer: { user: user.reducer },
});

export default store;