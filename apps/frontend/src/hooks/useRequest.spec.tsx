import { act, renderHook } from '@testing-library/react';
import * as React from 'react';
import useRequest from './useRequest';

describe('useRequest', () => {
  it('should render successfully', async () => {
    const { result } = renderHook(() =>
      useRequest({ url: '/test', method: 'get' })
    );

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await result.current.doRequest();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
  });
});
