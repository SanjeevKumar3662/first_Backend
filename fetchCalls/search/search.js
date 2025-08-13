const getSearchResults = async (options, query_type, query, page = 1) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/search/${query_type}?query=${query}&page=${page}`,
    options
  );

  console.log(`fetching ${query_type} query:${query} page: ${page}`);
  const data = await respose.json();

  return data;
};

export default getSearchResults;
