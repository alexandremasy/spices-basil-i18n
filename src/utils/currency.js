/**
 * 
 */
export default (basil) => {
  if (basil.hasOwnProperty('currency')) {
    return;
  }

  Object.defineProperty(basil, 'currency', {
    get: () => {
      
    }
  })
}
