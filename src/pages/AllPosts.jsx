import React, { useEffect, useState } from 'react'
import {PostCard} from "../components/index"
import databaseService from '../appwrite/config'

const AllPosts = () => {
    const [post, setPost] = useState([])
    useEffect(() => {
      databaseService.getPosts([]).then((response) => {
        if (response) {
          setPost(response.documents)
        }
      }
      ).catch((error) => {
        console.error(error)
      })
    }, [])
    
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold text-center'>All Posts</h2>
        <div className='flex flex-wrap justify-center gap-4'>
            {post.map((post) => (
                <PostCard key={post.$id} post={post} />
            ))}
        </div>
    </div>
  )
}

export default AllPosts