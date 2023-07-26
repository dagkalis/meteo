import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // If your API requires credentials, like cookies for authentication
});

// Custom hook for making GET requests
export function useGetAPI(url, params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    let isMounted = true;

    api.get(url, { params })
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          if (error.response && error.response.status === 401) {
            // Handle the 401 Unauthorized status code here
            // For example, navigate to the login page
            navigate('/');
          } else {
            setError(error);
            setLoading(false);
          }
        }
      });

    return () => {
      // Cleanup function to avoid state updates when component is unmounted
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

// Custom hook for making POST requests
export function usePostAPI(url, data) {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = () => {
    setLoading(true);

    api.post(url, data)
      .then((response) => {
        setResponseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return { responseData, loading, error, postData };
}