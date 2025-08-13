const getSearchResults = async ({search_type,options,query,page = 1}) =>{

  const respose = await fetch(
    `https://api.themoviedb.org/3/search/${search_type}?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options
  );

  console.log(`fetching ${search_type} query:${query} page: ${page}`);
  const data = await respose.json();

  return data;
};

export default getSearchResults;
