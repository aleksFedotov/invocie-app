import React, { useEffect, useState, useCallback, useRef } from 'react';

type HttpRes = {
  error: any;
  isLoading: boolean;
  sendRequest: (reqConfig: ReqConfig) => any;
};

type ReqConfig = {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
};

export default function useHttp(): HttpRes {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async ({ url, method = 'GET', headers = {}, body = null }: ReqConfig) => {
      setIsLoading(true);
      setError(null);

      const httpAbortCtrl = new AbortController();

      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const res = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal,
        });
        console.log(res);

        const resData = await res.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setIsLoading(false);
        return resData;
      } catch (error) {
        // @ts-ignore
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
}
