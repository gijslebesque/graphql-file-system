export const toBase64 = (file: string) => {
  const fileparse = JSON.parse(file);
  return btoa(
    fileparse.data.reduce((data: string, byte: number) => data + String.fromCharCode(byte), "")
  );
};
