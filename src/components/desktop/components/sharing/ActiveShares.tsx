/* eslint-disable react-hooks/exhaustive-deps */
import { useSharesStore } from '@/stores/sharing/useSharingStore';
import { useEffect } from 'react'

export default function ActiveShares() {

   const { shares, isLoading, fetchAllShares } = useSharesStore();

  useEffect(() => {
    fetchAllShares(); // 👈 déclenche le fetch une fois au mount
  }, []);

  useEffect(() => {
    console.table( shares);
  }, [shares]);


  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      activeShares
    </div>
  )
}
