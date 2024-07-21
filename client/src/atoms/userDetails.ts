import { atom } from 'recoil';

export const userDetailsAtom = atom({
    key: 'userDetailsAtom',
    default: {
        username: 'none',
        email: 'none',
        password: ''
    }
});