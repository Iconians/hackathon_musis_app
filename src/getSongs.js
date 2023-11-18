export const getSongs = async () => {
   const response = await fetch("http://localhost:3000/Songs");
   const songs = await response.json();
   return songs;
 };