import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import  Link  from 'next/link';

const sql = neon(process.env.DATABASE_URL!);

export default async function getMessagesPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;
    const accountType = cookieStore.get('account_type')?.value;

    if(!userId || accountType !== 'seller') {
        console.error('Unauthorized access to messages page');
    }

    const sellerId = Number(userId);

    const messages = await sql`
        SELECT 
        m.id,
        m.buyer_email,
        m.buyer_phone,
        m.buyer_message,
        m.created_at,
        p.title AS product_title
        FROM contact_requests m
        JOIN products p ON p.id = m.product_id
        WHERE p.seller_id = ${sellerId}
        ORDER BY m.created_at DESC
    `;

      return (
    <main className="messages-page">
      <h2>Your Messages</h2>

      {messages.length === 0 ? (
        <p>No contact requests yet.</p>
      ) : (
        <ul className="messages-list">
          {messages.map((msg: any) => (
            <li key={msg.id} className="message-card">
              <h3>Product: {msg.product_title}</h3>
              <p><strong>Email:</strong> {msg.buyer_email}</p>
              <p><strong>Phone:</strong> {msg.phone}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p className="timestamp">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
      <Link href="/accountHome" className="back-link">Back to Account Home</Link>
    </main>
  );

}