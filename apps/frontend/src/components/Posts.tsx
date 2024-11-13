import { useState } from 'react';
import { avatars } from '../assets/avatar/avatar';

interface ClassNamesProps {
  classes: (string | boolean | undefined | null)[];
}

function classNames(...classes: ClassNamesProps['classes']): string {
  return classes.filter(Boolean).join(' ');
}

export interface Post {
  id: string;
  user: {
    avatarIndex: number | null;
    username: string;
  };
  title: string;
  content: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-32">
      {posts.map((post) => (
        <div key={post.id} className="py-12 border-b border-gray-200">
          <div className="flex items-center">
            
              <img
                alt={`${post.user.username}`}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={avatars[post.user.avatarIndex!]}
                className="h-12 w-12 rounded-full"
              />
            <div className="ml-4">
              <h4 className="text-sm font-bold text-gray-100">
                {post.user.username}
              </h4>
              <h5 className="text-sm text-gray-100">
                {post.title}
              </h5>
            </div>
          </div>
          <div
            className={classNames(
              'mt-4 space-y-6 text-base italic text-gray-300 overflow-hidden transition-all duration-300',
              expandedPost === post.id ? 'max-h-full' : 'max-h-24'
            )}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <button
            onClick={() => toggleExpand(post.id)}
            className="mt-2 text-indigo-600 hover:text-indigo-900"
          >
            {expandedPost === post.id ? 'Show Less' : 'Read More'}
          </button>
        </div>
      ))}
    </div>
  );
}