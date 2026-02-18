import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SellForm from './SellForm/page';

export default async function SellPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  const accountType = cookieStore.get('account_type')?.value;

  if (!userId) {    
    redirect('/login');
  }

  if (accountType !== 'seller') {
    redirect('/'); 
  }

  return (
    <main>
      <h1>Sell Your Products</h1>
      <p>Share your unique items with our community</p>

      <SellForm />
    </main>
  );
}