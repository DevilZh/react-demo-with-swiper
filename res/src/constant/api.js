const getApi1 = (url) => 'https://a.bolo.me/v1/openapi' + url;
const getApi2 = (url) => 'https://a.bolo.me/v2/openapi' + url;

export const DOMAIN = 'https://img.bolo.me/shopping/app/images/shopping/';
export const GET_IMG_URL = (id) => "https://img.bolo.me/"+id+"@!middleJpegLQ";
export const GET_CATEGORY = getApi2('/categories');
export const GET_BRAND = getApi1('/brands');