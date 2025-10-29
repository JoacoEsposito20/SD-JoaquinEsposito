"use client";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (
  <div className="border p-4 rounded-lg shadow-md h-20"></div>
);

export default function Loading() {
  const cardCount = 30;
  const skeletonArray = Array(cardCount).fill(0); 

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="container mx-auto p-4">
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