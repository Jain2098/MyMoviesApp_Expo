import * as SecureStore from 'expo-secure-store';

export async function addFavorites(ID, type) {
  const currentFavorites = await SecureStore.getItemAsync(type);
  const updatedFavorites = currentFavorites ? [...currentFavorites, ID] : [ID];

  await SecureStore.setItemAsync(type, JSON.stringify(updatedFavorites));
}

export async function removeFavorites(ID, type) {
  const currentFavorites = await SecureStore.getItemAsync(type);
  const updatedFavorites = currentFavorites.filter((item) => item !== ID);

  await SecureStore.setItemAsync(type, JSON.stringify(updatedFavorites));
}

export async function getFavorites(type) {
  const currentFavorites = await SecureStore.getItemAsync(type);
  return currentFavorites ? JSON.parse(currentFavorites) : [];
}