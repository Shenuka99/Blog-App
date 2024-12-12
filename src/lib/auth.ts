'use server'

import { deleteSession, verifySession } from "@/app/actions/stateless-sessions";

export const sessionResults = async () => {
    const results = await verifySession()
    console.log(results, 'auth results')
    return results
}

export const logout = async () => {
    deleteSession()
}


