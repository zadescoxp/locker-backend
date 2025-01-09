import { encrypt, decrypt } from "tanmayo7lock";

export function encryptObjectValues(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = encrypt(obj[key]); // Apply decrypt to each value
    return acc;
  }, {});
}

export function decryptObjectValues(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = decrypt(obj[key]); // Apply decrypt to each value
    return acc;
  }, {});
}
