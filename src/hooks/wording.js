export const capitalize = (words) => {
  if (words) {
    const arr = words?.split(" ");
    let newWords = "";
    arr.forEach((word, i) => {
      const last = i === arr?.length - 1;
      newWords += word[0]?.toUpperCase() + word?.slice(1)?.toLowerCase();
      if (!last) newWords += " ";
    });
    return newWords;
  }
  return "";
};
