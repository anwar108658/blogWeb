import env from "../env-import/env"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(env.appwriteUrl)
            .setProject(env.appwriteProjectID)
        this.account = new Account(this.client)
    }

    async createAccount({name,email,password}){
        console.log(name,email,password)
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                const response = this.login({email,password})
                console.log(response)
                return response
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );            
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error)
        }
        return null
    }
    
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: logout :: error",error)
        }
    }

}

const authService = new AuthService();
export default authService
