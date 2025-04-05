import React, { useEffect } from 'react'
import {PostForm} from "../components/index"
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/config'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        databaseService.getPost(slug).then((response) => {
            if (response) {
                setPost(response)
            }
        }).catch((error) => {
            console.error(error)
        })
    }, [slug, navigate])

  return post ? (
    <div>
        <h2 className='text-3xl font-bold text-center'>Edit Post</h2>
        <PostForm post={post} />
    </div>
  ) : null
}

export default EditPost