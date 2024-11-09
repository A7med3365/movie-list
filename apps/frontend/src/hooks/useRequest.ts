import axios, { Method } from 'axios';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

interface UseRequestProps {
  url: string;
  method: Method;
  body?: Record<string, any>;
  onSuccess?: (response: any) => void;
  loading?: boolean;
}

interface UseRequestReturn {
  doRequest: (props?: Record<string, any>) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  errors: { message: string }[] | null;
}

export default function useRequest({
  url,
  method,
  body = {},
  onSuccess,
  loading = true,
}: UseRequestProps): UseRequestReturn {
  const [errors, setErrors] = useState<{ message: string }[] | null>(null);
  const [isLoading, setLoading] = useState(loading);
  const [isSuccess, setSuccess] = useState(false);

  const doRequest = async (props: Record<string, any> = {}) => {
    setLoading(true);
    try {
      console.log(`calling ${url} using ${method}`);
      const response = await axios.request({
        url,
        method,
        data: { ...body, ...props },
        withCredentials: true,
      });
      setSuccess(true);
      if (onSuccess) {
        await onSuccess(response);
      }
      console.log('hook:', response.data);
    } catch (err: any) {
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errors) {
      // errors.map((e) =>
      //   toast.error(e.message, {
      //     position: 'top-center',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //   })
      // );
    }
  }, [errors]);

  return { doRequest, isLoading, isSuccess, errors };
}
