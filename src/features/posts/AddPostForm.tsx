import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { postAdded } from '@/features/posts/postsSlice'
import { selectAllUsers } from '../users/usersSlice'

interface IAddPostFormsFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface IAddPostFormsElements extends HTMLFormElement {
  elements: IAddPostFormsFields
}

export function AddPostForm() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  function handleSubmit(e: React.FormEvent<IAddPostFormsElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const userId = elements.postAuthor.value
    dispatch(postAdded(title, content, userId))

    e.currentTarget.reset()
  }

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

  return (
    <>
      <section>
        <h2>Add new post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Post title:</label>
          <input type="text" id="postTitle" defaultValue="" required></input>

          <label htmlFor="postAuthor">Author:</label>
          <select name="postAuthor" id="postAuthor" required>
            <option value=""></option>
            {usersOptions}
          </select>

          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            defaultValue=""
            required
          ></textarea>

          <button type="submit">Save Post</button>
        </form>
      </section>
    </>
  )
}
