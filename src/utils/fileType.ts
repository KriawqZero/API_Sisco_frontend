export const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif)$/i.test(url);
};