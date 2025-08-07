
// Popular movies
const getMediaLists = async (page = 1, media_type,options) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/${media_type}/popular?language=en-US&page=${page}`,
    options
  );

  console.log(`fetching ${media_type} page: ${page}`);
  const data = await respose.json();

  return data;
};


export default getMediaLists;