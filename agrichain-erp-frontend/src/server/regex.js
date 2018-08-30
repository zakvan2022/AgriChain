export const UNMISTAKABLE_CHARS = '0123456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

export default {
  email: /^([a-z0-9_-]+[.+])*[a-z0-9_-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/,

  documentId: new RegExp(`^[${UNMISTAKABLE_CHARS}]{17}$`),
};
