const getMediaContent = async (options, id, media_type) => {
  const respose = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`,
    options
  );
  //id for superman 1061474

  console.log(`fetching ${media_type} id ${id}`);
  const data = await respose.json();

  return data;
};

export default getMediaContent;
