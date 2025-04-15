import React, { use, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, RTE, Select} from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import databaseService from '../../appwrite/config'


const PostForm = ({post}) => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const {register,handleSubmit,control,setValue,watch,getValues} = useForm({defaultValues:{
        title:post?.title || "",
        content:post?.content || "",
        slug:post?.slug || "",
        status:post?.status || "active",
    }})

    const submit = async (data) => {
        if (post) {
            const file = await data.image[0] ? databaseService.uploadFile(data.image[0]):null
            if (file) {
                databaseService.deleteFile(post?.featuredImage)
            }
            const dbPost = await databaseService.updatePost(post.$id,{
                ...data,
                featuredImage:file?.$id || undefined,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await databaseService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId:userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
        }
        return ""
    }
    ,[])

    useEffect(() => {
      const subscription = watch((value) => {
        const slug = slugTransform(value.title,{shouldValidate:true})
        setValue("slug",slug)
      })
      return () => {
        subscription.unsubscribe()
      }
    }, [watch])
    
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm