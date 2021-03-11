import {createAction} from "@reduxjs/toolkit";


export const setName = createAction('getName', function getName(name: string) {
    return {
        payload: {
            name
        }
    }
})
export const setUser = createAction('getUser', function getUser(user: any) {
    return {
        payload: {
            user
        }
    }
})