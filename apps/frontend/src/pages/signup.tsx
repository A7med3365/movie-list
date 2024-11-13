import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import movieClapperboard from '../assets/movie-clapperboard.svg';
import { avatars } from '../assets/avatar/avatar';
import Loading from 'react-loading';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  interface FormData {
    username: string;
    email: string;
    password: string;
    avatarIndex?: number;
  }

  const {
    doRequest,
    isLoading,
    errors: requestErrors,
  } = useRequest({
    url: 'api/users',
    method: 'POST',
    onSuccess: () => navigate('/signin'),
    loading: false,
  });

  const onSubmit = async (data: FormData) => {
    data.avatarIndex = parseInt(data.avatarIndex as unknown as string, 10);
    console.log(data);
    doRequest(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={movieClapperboard}
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register('username', { required: 'Username is required' })}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-white">
              Choose an avatar
            </label>
            <div className="mt-2 flex space-x-4">
              {avatars.map((avatar, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={index}
                    {...register('avatarIndex', {
                      required: 'Avatar is required',
                    })}
                    className="hidden"
                  />
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-16 h-16 rounded-full cursor-pointer border-2 border-transparent hover:border-indigo-500"
                  />
                </label>
              ))}
            </div>
            {errors.avatarIndex && (
              <p className="mt-2 text-sm text-red-600">
                {errors.avatarIndex.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : 'Sign up'}
            </button>
          </div>
        </form>

        {requestErrors && (
          <div className="mt-4 text-sm text-red-600">
            {requestErrors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account?{' '}
          <a
            href="/signin"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
