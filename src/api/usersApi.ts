import axios from 'axios';
import { UserType, UserTypeApi } from '../types/type';

const usersApi = axios.create({
    baseURL: 'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users',
});

export const getUsers = async () => {
    const res = await usersApi.get('/');
    return res.data;
}

export const getUser = async (id: UserType['id']) => {
    const res = await usersApi.get(`/${id}`);
    return res.data;
}

export const createUser = async (user: UserTypeApi) => {
    try {
        const res = await usersApi.post('/', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error creando user', error);
        throw error;
    }
}

export const updateUser = async (user: UserType) => {
    try {
        const res = await usersApi.put(`/${user.id}`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error actualizando user', error);
        throw error;
    }
}

export const deleteUser = (id: UserType['id']) => usersApi.delete(`/${id}`);
