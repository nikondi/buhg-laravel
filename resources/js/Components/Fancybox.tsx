import React, {HTMLAttributes, PropsWithChildren, useEffect, useRef} from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {OptionsType} from "@fancyapps/ui/types/Fancybox/options";

type Props = {
  selector?: string,
  options?: Partial<OptionsType>
  containerRef?: React.RefObject<HTMLDivElement>
} & HTMLAttributes<HTMLDivElement>

const default_options: Partial<OptionsType> = {
  Hash: false,
}

export default function Fancybox({selector = '[data-fancybox]', options = {}, children, containerRef, ...attributes}: PropsWithChildren<Props>) {
  const fancyboxInstance = useRef<any>(null);
  if(!containerRef)
    containerRef = useRef<HTMLDivElement>(null);

  const initFancybox = () => {
    const container = containerRef.current;
    fancyboxInstance.current.bind(container, selector, {...default_options, ...options});
  }

  const unbindFancybox = () => fancyboxInstance.current?.unbind(containerRef.current) && fancyboxInstance.current?.close();

  useEffect(() => {
    // Обычный импорт ломает SSR !!!Не трогать без проверки SSR!!!
    import('@fancyapps/ui').then(({Fancybox: NativeFancybox}) => {
      fancyboxInstance.current = NativeFancybox;
      initFancybox();
    });
    return unbindFancybox;
  }, []);

  return <div ref={containerRef} {...attributes}>{children}</div>;
}
