import { useState, useEffect } from 'react';

interface Holiday {
  date: string;
  name: string;
}

export const useHolidays = (year: number) => {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
  
    useEffect(() => {
      const fetchHolidays = async () => {
        try {
          const response = await fetch(`https://api-colombia.com/api/v1/holiday/year/${year}`);
          const data = await response.json();
          setHolidays(data.map((holiday: Holiday) => ({
            date: holiday.date,
            name: holiday.name
          })));
        } catch (error) {
          console.error('Error fetching holidays:', error);
        }
      };
  
      fetchHolidays();
    }, [year]);
  
    return holidays;
  };