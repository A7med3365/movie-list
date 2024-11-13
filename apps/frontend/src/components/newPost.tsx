import { useContext } from 'react';
import { avatars } from '../assets/avatar/avatar';
import { AuthContext } from '../contexts/AuthContext';
import { Avatar } from './catalyst-ui-kit/avatar';
import { useForm } from 'react-hook-form';
import useRequest from '../hooks/useRequest';
import Loading from 'react-loading';

interface NewPostProps {
  refresh: () => Promise<void>;
}

export default function NewPost({ refresh }: NewPostProps) {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<FormData>();

  const { doRequest: createPost, isLoading } = useRequest({
    url: '/api/posts',
    method: 'post',
    onSuccess: (res) => {
      console.log(res.data);
      refresh();
    },
    loading: false,
  });

  interface FormData {
    title: string;
    description: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
    createPost({
      title: data.title,
      content: data.description,
      user: currentUser?.id,
    });
  };

  return (
    <div className="flex gap-6">
      <Avatar
        className="h-20 w-20"
        src={avatars[currentUser?.avatarIndex ?? 0]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex-grow">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="block w-full border-0 pt-2.5 px-4 text-lg font-medium text-white placeholder:text-gray-400 focus:ring-transparent bg-inherit"
            {...register('title')}
          />
          <textarea
            id="description"
            rows={2}
            placeholder="Write a description..."
            className="block w-full resize-none border-0 px-4 py-2 h-32 text-white placeholder:text-gray-100 sm:text-sm/6 bg-inherit"
            {...register('description')}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex"></div>
            <div className="shrink-0">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  <Loading type="spin" color="#ffffff" height={20} width={20} />
                ) : (
                  'Post'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
