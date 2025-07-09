import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'

interface IEditPostFormsFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface IEditPostFormElements extends HTMLFormElement {
  elements: IEditPostFormsFields
}

export function EditPostForm() {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId!))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  function savePostHandler(e: React.FormEvent<IEditPostFormElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget

    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content && post?.id) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={savePostHandler}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          defaultValue={post.title}
          required
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue={post.content}
          required
        />

        <button>Save Post</button>
      </form>
    </section>
  )
}
