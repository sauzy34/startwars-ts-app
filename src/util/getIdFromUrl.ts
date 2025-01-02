function getIdFromUrl(url: string) {
  if (!url) return null;

  const splitted = url.split("/");

  if (splitted.length > 0) {
    return splitted[splitted.length - 1];
  }

  return null;
}

export { getIdFromUrl };
