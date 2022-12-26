import React from 'react';

import './checkbox.css';

export default function Checkbox ({ label, value, valueSetter, className, disableOutline = false, disableLabel = false, customIndicator = ['check', ''] }) {
  if (customIndicator && (!Array.isArray(customIndicator) || customIndicator.length !== 2)) {
    throw new Error('Custom indicator must be a 2-element array of valid Material Font identifiers');
  }
  const composedClasses = [
    'checkbox-organizer',
    disableOutline ? 'bare' : '',
    disableLabel ? 'unlabeled' : '',
    className
  ].join(' ');
  return (
    <div className={composedClasses}>
      <span className='checkbox-title'>
        {label}
      </span>
      <div
        className={`custom-checkbox${value ? ' checked' : ''}`}
        onClick={() => valueSetter(prev => !prev)}
      >
        <span className='material-symbols-outlined'>
          {value ? customIndicator[0] : customIndicator[1]}
        </span>
      </div>
    </div>
  );
}
