import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HouseEntry ({ house }) {
  const navigate = useNavigate();

  const goToResidence = () => navigate(`/residences/${house.id}`);

  return (
    <div
      className='house-entry'
      onClick={goToResidence}
    >
      {house.name}
    </div>
  );
}
