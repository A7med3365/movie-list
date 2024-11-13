import React, { useContext, useEffect } from 'react';
import useRequest from '../hooks/useRequest';
import Loading from '../components/loading';
import Posts from '../components/Posts';
import NewPost from '../components/newPost';
import { AuthContext } from '../contexts/AuthContext';

const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);
  const {isSignedIn} = useContext(AuthContext);
  const { doRequest, isLoading} = useRequest({
    url: '/api/posts',
    method: 'get',
    onSuccess: (res) => {
      // console.log(res.data);
      setPosts(res.data);
    },
  });
  
  useEffect(() => {
    doRequest();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {isSignedIn && <NewPost refresh={async () => await doRequest()} />}
      <Posts posts={posts.reverse()} />
    </div>
  );
};

export default PostsPage;
