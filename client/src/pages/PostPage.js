import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => response.json())
      .then(postInfo => setPostInfo(postInfo))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);


  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{new Date(postInfo.createdAt).toLocaleString()}</time>
      <div className="author">by {postInfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      <Link className="button edit-button" to={`/edit/${postInfo._id}`}>Edit this post</Link>
      <Link className="button delete-button" to={`/delete/${postInfo._id}`}>Delete Post</Link>
    </div>
  );
}
