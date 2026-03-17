import { useEffect, useState } from 'react';
import axios from 'axios';

export interface RequestRecord {
  type: 'Leave' | 'Overtime' | 'Dispute';
  sub_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  created_at: string;
  remarks: string;
  coach_first: string | null;
  coach_last: string | null;
  admin_first: string | null;
  admin_last: string | null;
}

export const useRequestsHistory = (employeeId: string = '1001') => {
  const [data, setData] = useState<RequestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${baseUrl}/users/get_my_request_history.php?employee_id=${employeeId}`);
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch request history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [employeeId]);

  return { data, loading, error, refetch: fetchData };
};
