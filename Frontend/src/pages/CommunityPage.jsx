import React, { useEffect, useState } from "react";
import { fetchPosts } from "../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import CommunitySideBar from "../components/CommunitySideBar";
import CreatePost from "../components/CreatePost";

const Community = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postsStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [createPostIsOpen, setCreatePostIsOpen] = useState(false);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 gap-y-4 md:gap-x-4">
      {/* Main Content */}
      <main className="w-full md:w-3/4 flex flex-col space-y-4">  
        {/* Display Posts */}
        {postsStatus === "loading" && <p>Loading posts...</p>}
        {postsStatus === "failed" && <p className="text-red-500">Error: {error}</p>}
        {postsStatus === "succeeded" && posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </main>

      {/* New Post Button */}
      <button
        onClick={() => setCreatePostIsOpen(true)}
        className="fixed bottom-10 left-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        + New Post
      </button>

      

      {/* Sidebar */}
      <CommunitySideBar />

      {/* Post Creation Modal */}
      {createPostIsOpen && <CreatePost onClose={() => setCreatePostIsOpen(false)} />}
    </div>
  );
};

export default Community;
