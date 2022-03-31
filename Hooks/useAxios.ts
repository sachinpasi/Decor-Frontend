import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/router";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

interface Fetch {
  axiosParams: AxiosRequestConfig;
  Prefetch?: boolean | false;
}

const useAxios = ({ axiosParams, Prefetch }: Fetch) => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<AxiosError>();

  const [loading, setLoading] = useState(
    axiosParams.method === "GET" || axiosParams.method === "get"
  );

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const Run = () => {
    fetchData(axiosParams);
  };

  useEffect(() => {
    if (Prefetch) {
      if (axiosParams.method === "GET" || axiosParams.method === "get") {
        fetchData(axiosParams);
      }
    }
  }, [Prefetch]);

  return { response, error, loading, Run };
};

export default useAxios;
