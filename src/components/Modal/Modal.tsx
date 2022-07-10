import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteArticle } from '../../store/articlesSlice';
import classes from './Modal.module.scss';

interface ModalProps {
  children: JSX.Element;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const { id: slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleVisibility = (): void => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (modalRef.current) {
      const { right } = modalRef.current.getBoundingClientRect();
      const view = document.documentElement.clientWidth;
      if (right > view) {
        modalRef.current.style.top = '40px';
        modalRef.current.style.left = `-45px`;
      }
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        modalRef.current &&
        wrapperRef.current &&
        !e.composedPath().includes(modalRef.current) &&
        !e.composedPath().includes(wrapperRef.current)
      )
        setIsVisible(false);
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDeleteArticle = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await dispatch(deleteArticle(slug as string));
    if (!res.error) navigate('/', { replace: true });
  };

  return (
    <div
      onClick={handleVisibility}
      ref={wrapperRef}
      className={classes['modal-wrapper']}
      role="presentation"
    >
      {isVisible && (
        <div className={classes.modal} ref={modalRef}>
          <p className={classes['modal-text']}>
            Are you sure to delete this article?
          </p>
          <div className={classes['modal-button']}>
            <button
              type="button"
              className={classes['modal-deny']}
              onClickCapture={() => setIsVisible(false)}
            >
              No
            </button>
            <button
              type="button"
              className={classes['modal-confirm']}
              onClickCapture={() => handleDeleteArticle()}
            >
              Yes
            </button>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Modal;
