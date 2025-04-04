import React from 'react'
import databaseService from '../../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({$id,title,featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="post-card">
            <img src={databaseService.getFilePreview($id)} alt={title} className="post-card__image" />
            <h2 className="post-card__title">{title}</h2>
        </div>    
    </Link>
  )
}

export default PostCard