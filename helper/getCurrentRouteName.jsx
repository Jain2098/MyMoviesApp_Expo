/**
 * Recursively finds the name of the currently active screen in the navigation state.
 *
 * @param {Object} navigationState The current state object of the navigation tree.
 * @returns {string|null} The name of the currently active screen, or `null` if not found.
 */
export const getCurrentRouteName = (navigationState) => {

  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];

  // console.log(navigationState.type, ' \t ', navigationState.index)

  if (route.state) {
    return getCurrentRouteName(route.state);
  }
  // console.log('route: ', route)
  // console.log('route.state: ', route.state)
  return route.name;
};