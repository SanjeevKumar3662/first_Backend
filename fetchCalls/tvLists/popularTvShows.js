const getPopularTV = async (page=1,options) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
    options
  );

  console.log("fetchingPopularTV", "page=" + page);
  const data = await respose.json();

  return data;
};

export default getPopularTV;