import NextHead from 'next/head';

const defaultDescription = 'An example PWA';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#302ecd" />
    <link rel="manifest" href="/_next/static/manifest.json" />
    <link rel="icon" href="/static/favicon.ico" />
    <link rel="stylesheet" href="/_next/static/style.css" />
  </NextHead>
);

export default Head;
