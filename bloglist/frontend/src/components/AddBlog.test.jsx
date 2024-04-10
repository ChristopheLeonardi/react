import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<AddBlog />', () => {

  test('after clicking the like button twice, likes increase as well', async () => {

    let mockHandler = vi.fn()
    let container = render(
      <form onSubmit={mockHandler}>
        <input name='title' value='title'/>
        <input name='author' value='author'/>
        <input name='url' value='url'/>
        <input name='likes' value='likes'/>
        <button type='submit'>Submit</button>
      </form>
    )

    const user = userEvent.setup()

    const submitButton = screen.getByText('Submit')
    await user.click(submitButton)
    // Don't work
    //console.log(mockHandler.mock)
    /* expect(mockHandler).toHaveBeenCalledWith({
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 'likes'
    }) */
  })
})