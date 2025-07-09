import { useAppDispatch } from '@/app/hooks'
import { postAdded } from '@/features/posts/postsSlice'
import { nanoid } from '@reduxjs/toolkit'

interface IAddPostFormsFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface IAddPostFormsElements extends HTMLFormElement {
  elements: IAddPostFormsFields
}

export function AddPostForm() {
  const dispatch = useAppDispatch()

  function handleSubmit(e: React.FormEvent<IAddPostFormsElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    dispatch(postAdded(title, content))

    e.currentTarget.reset()
  }

  return (
    <>
      <section>
        <h2>Add new post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Post title:</label>
          <input type="text" id="postTitle" defaultValue="" required></input>

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
