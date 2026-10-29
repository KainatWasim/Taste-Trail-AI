import React, { useState, useEffect } from 'react';
import { getPlaceFallbackImage, GUARANTEED_LOCAL_FALLBACKS } from '../utils/imageUtils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  fallbackDestination?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Cultural Travel Experience',
  fallbackCategory,
  fallbackDestination,
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (src && typeof src === 'string' && src.trim() && src !== '{}') {
      return src;
    }
    return getPlaceFallbackImage(fallbackDestination, fallbackCategory);
  });
  const [retryStage, setRetryStage] = useState(0);

  useEffect(() => {
    if (src && typeof src === 'string' && src.trim() && src !== '{}') {
      setImgSrc(src);
    } else {
      setImgSrc(getPlaceFallbackImage(fallbackDestination, fallbackCategory));
    }
    setRetryStage(0);
  }, [src, fallbackDestination, fallbackCategory]);

  const handleError = () => {
    if (retryStage === 0) {
      setRetryStage(1);
      const contextualFallback = getPlaceFallbackImage(fallbackDestination, fallbackCategory);
      if (contextualFallback !== imgSrc) {
        setImgSrc(contextualFallback);
        return;
      }
    }
    if (retryStage <= 1) {
      setRetryStage(2);
      setImgSrc(GUARANTEED_LOCAL_FALLBACKS.heritage);
      return;
    }
    setRetryStage(3);
    setImgSrc(GUARANTEED_LOCAL_FALLBACKS.hero);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`object-cover ${className}`}
      {...props}
    />
  );
};
