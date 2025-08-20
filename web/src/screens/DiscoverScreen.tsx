// web/src/screens/DiscoverScreen.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearbyUsers } from '../store/userSlice';

export default function DiscoverScreen() {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.user.nearby);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchNearbyUsers());
  }, [dispatch]);

  const currentUser = users[currentIndex];

  return (
    <div className="flex flex-col items-center h-screen bg-pink-50">
      {currentUser ? (
        <div className="w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={currentUser.photos[0]} alt="user" className="w-full h-3/4 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{currentUser.name}, {currentUser.age}</h2>
            <p>{currentUser.bio}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex space-x-4 mt-8">
        <button className="w-16 h-16 bg-red-500 rounded-full text-white text-2xl">✕</button>
        <button className="w-16 h-16 bg-green-500 rounded-full text-white text-2xl">♥️</button>
      </div>
    </div>
  );
}