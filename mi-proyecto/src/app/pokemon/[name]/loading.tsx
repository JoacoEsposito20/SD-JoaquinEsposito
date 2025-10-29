"use client";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (
  <div className="border p-6 rounded-lg shadow-xl w-80 flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 transition duration-300">
    
    <div className="w-40 h-40 pt-4 bg-gray-100 rounded-lg flex items-center justify-center">
      <Skeleton 
        circle={false} 
        height="100%"
        width="100%"
        className="rounded-lg" 
      />
    </div>

    <div className="w-full flex flex-col items-center">
      <Skeleton width="60%" height={24} /> 
    </div>

    <div className="w-full pt-2">
      <Skeleton width="40%" height={18} className="mb-2" /> 
      
      <ul className="space-y-2">
        <li><Skeleton width="80%" height={14} /></li>
        <li><Skeleton width="75%" height={14} /></li>
        <li><Skeleton width="50%" height={14} /></li>
      </ul>
    </div>
    
  </div>
);

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
        <SkeletonCard />
      </div>
    </SkeletonTheme>
  );
}