import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "2adac537-f476-4e82-9502-65ff298e0acc"
    }
});

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow: (userId) => {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow: (userId) => {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    getAuth: () => {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    setLogin: (data) => {
        return instance.post('auth/login', data)
            .then(response =>response.data);
    },
    setLogout: () => {
        return instance.delete('auth/login')
            .then(response =>response.data);
    },
    getCaptcha: () => {
        return instance.get('security/get-captcha-url')
            .then(response =>response.data);
    }
}

export const profileAPI = {
    getProfile: (userId) => {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus: (userId) => {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus: (status) => {
        return instance.put(`profile/status/`, {status})
            .then(response => response.data)
    }
}



// export const unfollow

// export const