const convertBase64 = (file, setNoteImage) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onload = () => setNoteImage(reader.result);
  reader.onerror = (error) => reject(error);
});
export default convertBase64;
