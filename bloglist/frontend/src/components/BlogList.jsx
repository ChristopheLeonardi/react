import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setListNeedUpdate }) => {

  const addLike = blog => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, newBlog)
    setListNeedUpdate(true)
  }

  const removeBlog = blog => {
    const confirm = window.confirm(`Delete : ${blog.title} ?`)
    if(confirm){
      blogService.remove(blog.id)
      setListNeedUpdate(true)
    }
  }

  return (
    <>
      {blogs
        .sort((a, b) => { return b.likes - a.likes} )
        .map(blog => {
          return (
            <div key={blog.id} className="single-blog">
              <p>{blog.title} {blog.author}</p>
              <Togglable showLabel='Hide' hideLabel='Show' initialView={false}>
                <p>{blog.url}</p>
                <p>Likes : {blog.likes}</p>
                <button onClick={() => {addLike(blog)}}>Like</button>
                {blog.user && <p>Added by : {blog.user.username}</p>}
                <button onClick={() => {removeBlog(blog)}}>Delete</button>
              </Togglable>
            </div>
          )
        })}
    </>
  )
}
export default BlogList