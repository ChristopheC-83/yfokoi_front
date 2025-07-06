import { useState, useEffect } from 'react';

type Viewport = 'mobile' | 'tablet' | 'desktop';

const getDevice = (width: number, breakpoints: { tablet: number; desktop: number }): Viewport => {
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
};

function useViewport(
  breakpoints = { tablet: 1024, desktop: 1280 }
): Viewport {
  const isClient = typeof window === 'object';

  const [viewport, setViewport] = useState<Viewport>(() => 
    isClient ? getDevice(window.innerWidth, breakpoints) : 'mobile'
  );

  useEffect(() => {
    const handleResize = () => {
      setViewport(getDevice(window.innerWidth, breakpoints));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return viewport;
}

export default useViewport;
