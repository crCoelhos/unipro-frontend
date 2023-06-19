import { useState, useEffect } from 'react';

export default function useScript(url: string, name: string) {
  const [lib, setLib] = useState<Record<string, any>>({});

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.onload = () => setLib({ [name]: (window as any)[name] });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [name, url]);

  return lib;
}
