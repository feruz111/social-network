import axios from "axios";
import { ProfilePutTypes } from "./types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "5b802dfc-8175-4671-99bf-e30ddb894d16",
  },
});

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unFollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  profileAPI(userId: string | null) {
    console.warn("Obsolete method. Use profileAPI");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: string | null) {
    return instance.get(`profile/${userId}`).then((response) => response);
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status });
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put("/profile/photo", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfilePutTypes) {
    return instance.put(`profile`, profile);
  },
};

export const authAPI = {
  authMeAPI() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string = null
  ) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
