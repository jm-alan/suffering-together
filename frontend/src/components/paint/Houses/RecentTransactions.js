import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { clearPlusController, hidePlus, setPlusController, showPlus } from '../../../store/UX/plus';
import EnablePlus from '../../logic/EnablePlus';

export default function RecentTransactions () {
  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(setPlusController(scrollRef.current));
    dispatch(showPlus());
    return () => {
      dispatch(hidePlus());
      dispatch(clearPlusController());
    };
  }, [dispatch, scrollRef]);

  return (
    <>
      <EnablePlus />
      <div className='current-residence-subcontainer bottom' ref={scrollRef}>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
        <div className='residence-subcontainer-entry transaction'>
          <div className='entry-subcontainer left'>
            <span className='recent-transaction-title'>
              Info
            </span>
          </div>
          <div className='entry-subcontainer right'>
            <span className='recent-transaction-amount'>
              $9.99
            </span>
            <span className='recent-transaction-creditor'>
              Adam
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
