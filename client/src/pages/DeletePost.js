import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

export default function DeletePost() {
  const { id } = useParams();
  const [redirect, setRedirect] = React.useState(false);

  async function handleDelete() {
    const response = await fetch(`https://blog-app-m-backend.vercel.app/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      const errorText = await response.text();
      console.error('Error deleting post:', errorText);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Are you sure you want to delete this post?</h2>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
}
