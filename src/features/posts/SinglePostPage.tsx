import { useAppSelector } from '@/app/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'

export function SinglePostPage() {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId!))

  if (post === undefined) {
    return (
      <section>
        <h2>No posts found</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
