import env from "../env-import/env"
import { Client, Databases, ID, Query, Role, Storage, } from "appwrite";

export class DatabaseService{
    client = new Client();
    databases
    bucket

    constructor(){
        this.client
            .setEndpoint(env.appwriteUrl)
            .setProject(env.appwriteProjectID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(env.appwriteDatabaseID,env.appwriteCollectionID,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error)
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(env.appwriteDatabaseID,env.appwriteCollectionID,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(env.appwriteDatabaseID,env.appwriteCollectionID,slug)
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(env.appwriteDatabaseID,env.appwriteCollectionID,slug)
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error)
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(env.appwriteDatabaseID,env.appwriteCollectionID,queries)
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error",error)
        }
    }

    // file Upload Services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                env.appwriteBucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error)
        }
        return null
    }

    async deleteFile(fileId){
        try {
           return await this.bucket.deleteFile(env.appwriteBucketID,fileId)
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error",error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            env.appwriteBucketID,
            fileId
        )
    }
}

const databaseService = new DatabaseService()
export default databaseService