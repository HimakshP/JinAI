import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginModal } from './LoginModal';

export const LoginButton: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      )}

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}; 