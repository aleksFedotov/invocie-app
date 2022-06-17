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
  const [error, setError] = useState<null | string>(null);

  const sendRequest = useCallback(
    async ({ url, method = 'GET', headers = {}, body = null }: ReqConfig) => {
      // Seting setisloading to treu so we can show users that requeat is pending
      setIsLoading(true);
      // reseting error
      setError(null);
      try {
        // sending request on;y urls is required other optionals
        const res = await fetch(url, {
          method,
          headers,
          body,
        });

        const resData = await res.json();
        if (!res.ok) {
          throw resData.msg;
        }
        // if everything is ok set isloadong to false to show users that is we finished with sending request and return data
        setIsLoading(false);
        return resData;
      } catch (error) {
        // @ts-ignore
        // if we catch error set error to error info and to false to show users that is we finished with sending request
        setError(error);
        setIsLoading(false);
        // throwing error sot we can catch it in component
        throw error;
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
}
