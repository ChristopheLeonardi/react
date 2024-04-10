import { useState } from 'react'
import FormEntry from './FormEntry'
import blogService from '../services/blogs'

const AddBlog = ({ setNotificationMessage, setListNeedUpdate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const handleAddBlog = e => {
    e.preventDefault()
    if(title.length < 3 || url.length < 3){
      setNotificationMessage('error, title or url length')
      return
    }
    const blogToAdd = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    }

    blogService.create(blogToAdd)
    setNotificationMessage('Blog Added')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setListNeedUpdate(true)
  }
  return (
    <form onSubmit={handleAddBlog}>
      <FormEntry name="title" value={title} setValue={setTitle}/>
      <FormEntry name="author" value={author} setValue={setAuthor}/>
      <FormEntry name="url" value={url} setValue={setUrl}/>
      <FormEntry name="likes" value={likes} setValue={setLikes}/>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddBlog