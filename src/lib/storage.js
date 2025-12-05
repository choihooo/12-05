export function localStorageSetItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
