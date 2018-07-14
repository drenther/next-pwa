import React, { Fragment } from 'react';
import ProgressiveImage from 'react-progressive-image';

const Image = ({ src, alt, className }) => (
  <ProgressiveImage
    src={src}
    placeholder="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
  >
    {(currentSrc, loading) => (
      <Fragment>
        <img src={currentSrc} alt={alt} className={loading ? `${className} loading-img` : className} />
        <noscript>
          <img src={src} alt={alt} className={className} />
        </noscript>
      </Fragment>
    )}
  </ProgressiveImage>
);

export default Image;
