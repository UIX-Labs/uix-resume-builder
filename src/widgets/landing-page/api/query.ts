import { useQuery } from '@tanstack/react-query';
import { getCurrentStats } from './stats';

const getCurrentStatsQuery = () => {
  return useQuery({
    queryKey: ['currentStats'],
    queryFn: getCurrentStats,
  });
};

export default getCurrentStatsQuery;
