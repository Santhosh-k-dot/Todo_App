import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { auth } from '../lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <Layout>
      <div className="container">
        <div className="card">
          <h1>Welcome to TODO App</h1>
          <p>Redirecting...</p>
        </div>
      </div>
    </Layout>
  );
}