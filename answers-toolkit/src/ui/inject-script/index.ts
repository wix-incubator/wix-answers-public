export const injectScript = (src: string) => {
    const d = document;
    const aws = d.createElement('script');
    aws.type = 'text/javascript';
    aws.async = true;
    aws.src = src;
    const s = d.getElementsByTagName('script')[0];
    s && s.parentNode && s.parentNode.insertBefore(aws, s);
};
