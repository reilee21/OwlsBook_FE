
import { useEffect, useRef } from 'react';

const IntersectionObserverComponent = ({ onIntersect }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [onIntersect]);

  return(
    <div ref={targetRef} style={{ height: '10px' }} />
  ); 
};

export default IntersectionObserverComponent;
