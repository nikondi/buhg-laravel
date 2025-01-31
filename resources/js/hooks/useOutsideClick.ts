import {useEffect, useRef} from "react";

export default function useOutsideClick<T = Element>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target as Element))
        callback();
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
