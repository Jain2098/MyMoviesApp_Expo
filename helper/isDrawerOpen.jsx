// export const isDrawerOpen = (state) => {
  
//   if (state.type === 'drawer' && state.history?.some(item => item.type === 'drawer')) {
//     console.log("Drawer Opened - 1")
//     return true;
//   }
//   for (const route of state.routes) {
//     if (route.state) {
//       const isOpen = isDrawerOpen(route.state);
//       if (isOpen) {
//         console.log("Drawer Opened - 2")
//         return true;
//       }
//     }
//   }
//   console.log("Drawer still Closed")
//   return false;
// };
