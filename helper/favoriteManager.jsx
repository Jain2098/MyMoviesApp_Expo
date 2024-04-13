import * as SecureStore from 'expo-secure-store';

export async function addFavorites(ID, type) {
  const currentFavorites = await getFavorites(type);
  if (currentFavorites.includes(ID)) return console.log('Already in favorites');

  const updatedFavorites = [...currentFavorites, ID];
  console.log(`Adding ${ID} to favorites\t ${updatedFavorites}`)
  await SecureStore.setItemAsync(type, JSON.stringify(updatedFavorites));
}


export async function removeFavorites(ID, type) {
  const currentFavorites = await getFavorites(type);
  const updatedFavorites = currentFavorites.filter((item) => item !== ID);
  console.log(`Removing ${ID} from ${type}\t ${updatedFavorites}`)
  await SecureStore.setItemAsync(type, JSON.stringify(updatedFavorites));
}


export async function getFavorites(type) {
  console.log("getFavorites MAIN function Called")
  const currentFavorites = await SecureStore.getItemAsync(type);
  console.log(`Current favorites for ${type}:`, currentFavorites);
  return currentFavorites ? JSON.parse(currentFavorites) : [];
}

export async function removeAllFavorites(type) {
  console.log(`Removing all favorites for ${type}`);
  try {
    console.log(`Removing all favorites for ${type}`);
    await SecureStore.deleteItemAsync(type);
  } catch (error) {
    console.error('Failed to remove all favorites:', error);
  }
}
