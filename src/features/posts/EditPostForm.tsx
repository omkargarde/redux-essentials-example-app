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

  // before: const post = useAppSelector((state) => selectPostById(state, postId!))
  const post = useAppSelector((state) =>
    postId ? selectPostById(state, postId) : undefined,
  )

  if (!post || !postId) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function savePostHandler(e: React.FormEvent<IEditPostFormElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget

    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content && post?.id) {
      try {
        dispatch(postUpdated({ id: post.id, title, content }))
        navigate(`/posts/${post.id}`)
      } catch (error) {
        console.error('Failed to update post:', error)
        // TODO: display notification to the user about the failure
      }
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
