import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<BlogList />', () => {
  let container

  beforeEach(() => {

    container = render(
      <div className="single-blog">
        <p>title author</p>
        <Togglable showLabel='Hide' hideLabel='Show' initialView={false}>
          <p className='hideByDefault'>url</p>
          <p className='hideByDefault'>likes</p>
          <button onClick={() => {}}>likeButton</button>
        </Togglable>
      </div>
    ).container
  })

  test('at start the children are not displayed', () => {
    const singleBlog = container.querySelector('.single-blog')
    const children = singleBlog.querySelector('.hideByDefault')
    expect(children).toBeNull()
  })

  test('after clicking the show button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const children = container.querySelectorAll('.hideByDefault')
    expect(children).toHaveLength(2)
  })

  test('after clicking the like button twice, likes increase as well', async () => {
    let mockHandler = vi.fn()

    render(
      <button onClick={mockHandler}>likeButton</button>
    )
    const user = userEvent.setup()

    const likeButton = screen.getByText('likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})