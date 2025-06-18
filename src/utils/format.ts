export const formatPrice = (price: number) => {
  if (typeof price !== 'number' || isNaN(price)) {
    throw new TypeError('Price must be a valid number');
  }
  return (
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' EUR'
  );
};
