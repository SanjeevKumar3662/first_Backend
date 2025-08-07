const getTVdetails = async (id,options) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    options
  );

  console.log("fetching TV Details");
  const data = await response.json();

  return data;
};

export default getTVdetails;
