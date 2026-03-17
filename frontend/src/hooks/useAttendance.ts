import { useEffect, useState } from 'react';
import axios from 'axios';

export interface AttendanceRecord {
  date: string;
  time_in: string;
  time_out: string;
  break_in: string;
  break_out: string;
  total_hours: string;
  status: string;
}

export const useAttendance = (employeeId: string = '1001') => {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (start?: string, end?: string) => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const params = new URLSearchParams({
        employee_id: employeeId,
        ...(start && { start_date: start }),
        ...(end && { end_date: end })
      });
      
      const response = await axios.get(`${baseUrl}/users/get_my_attendance.php?${params.toString()}`);
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [employeeId]);

  return { data, loading, error, refetch: fetchData };
};
