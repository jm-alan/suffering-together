import React from 'react';
import { Link } from 'react-router-dom';

export default function NavButton ({
  icon,
  destination,
  onClick,
  notificationCount,
  first,
  last
}) {
  const content = (
    <span className='material-symbols-outlined'>
      {icon}
    </span>
  );

  const resolvedClass = `nav-button clickable${first ? ' first' : ''}${last ? ' last' : ''}`;

  if (destination) {
    return (
      <Link to={destination} className={resolvedClass}>
        {content}
      </Link>
    );
  } else if (onClick) {
    return (
      <div onClick={onClick} className={resolvedClass}>
        {content}
      </div>
    );
  } else return null;
}
