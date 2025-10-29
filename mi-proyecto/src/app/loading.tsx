"use client";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (
  <div className="border p-4 rounded-lg shadow-md h-40">
    <div className="flex justify-between items-center mb-4">
      <Skeleton width={100} height={20} />
      <Skeleton circle width={50} height={50} />
    </div>
    <Skeleton count={2} />
  </div>
);

export default function Loading() {
  const cardCount = 20;
  const skeletonArray = Array(cardCount).fill(0); 

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
            <Skeleton width={300} height={35} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {skeletonArray.map((_, index) => (
            <li key={index}>
              <SkeletonCard />
            </li>
          ))}
        </ul>
      </div>
    </SkeletonTheme>
  );
}