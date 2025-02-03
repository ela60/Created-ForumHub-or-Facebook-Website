import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Only run the query when user email is available
  const { data: cart = [], isLoading, refetch } = useQuery({
    queryKey: ['cart', user?.email], // This is the unique key for the query
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/carts?email=${user.email}`);
        return res.data;
      }
      return []; 
    },
    enabled: !!user?.email, 
  });

  return [cart, isLoading, refetch];
};

export default useCart;
