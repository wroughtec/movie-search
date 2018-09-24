// @flow

export const trimString = (str: string, maxLength?: number = 200) => {
  if (str.length <= maxLength) return str;

  const trimmedString = str.substr(0, maxLength);

  let ending = '';

  if (str.length > maxLength) {
    ending = '...';
  }

  const truncatedString = `${trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  )}${ending}`;

  return truncatedString;
};
