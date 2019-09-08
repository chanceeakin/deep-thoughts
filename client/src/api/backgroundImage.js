// todo  SEND dimensions to this thing
export const getRandomImage = async () => {
  try {
    const response = await fetch("https://source.unsplash.com/random");

    return response;
  } catch (e) {
    throw e;
  }
};
