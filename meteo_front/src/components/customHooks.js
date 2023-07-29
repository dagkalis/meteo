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
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            navigate('/login');
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
export function useGetAPIWait(url, params = {}) {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = () => {
    setLoading(true);
    setError(false);

    api.get(url, { params })
      .then((response) => {
        setResponseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Handle the 401 Unauthorized status code here
          // For example, navigate to the login page
          navigate('/login');
        } else {
          setError(error);
          setLoading(false);
        }
      });
  };

  return { responseData, loading, error, getData };
}

// Custom hook for making POST requests
export function usePostAPI(url, data) {
  const navigate = useNavigate();

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
        if (error.response && error.response.status === 401) {
          // Handle the 401 Unauthorized status code here
          // For example, navigate to the login page
          navigate('/login');
        } else {
          setError(error);
          setLoading(false);
        }
      });
  };

  return { responseData, loading, error, postData };
}


// Custom hook for making Patch requests
export function usePatchAPI(url) {
  const navigate = useNavigate();
  
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = (data) => {
    setLoading(true);

    api.patch(url, data)
      .then((response) => {
        setResponseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error with patch', error)
        if (error.response && error.response.status === 401) {
          // Handle the 401 Unauthorized status code here
          // For example, navigate to the login page
          navigate('/login');
        } else {
          setError(error);
          setLoading(false);
        }
      });
  };

  return { responseData, loading, error, patchData };
}


// Custom hook for making Delete requests
export function useDeleteAPI(url) {
  const navigate = useNavigate();
  
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = () => {
    setLoading(true);
    setError(false);

    api.delete(url)
      .then((response) => {
        // if request successful but no content from api, put 'deleted'
        // so that it's easy to check if request is done
        setResponseData(response.data || 'deleted'); 
        setLoading(false);
      })
      .catch((error) => {
        console.log('error with delete', error)
        if (error.response && error.response.status === 401) {
          // Handle the 401 Unauthorized status code here
          // For example, navigate to the login page
          navigate('/login');
        } else {
          setError(error);
          setLoading(false);
        }
      });
  };

  return { responseData, loading, error, deleteData };
}