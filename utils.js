export const createFilterUrl = ({min, max}) => {
  const minString = `min_price=${min}`

  const maxString = max ? `&max_price=${max}` : ''

  return `http://localhost:3000/products?${minString}${maxString}`
}

export const splitFilter = (filter) => {
  const { min, max } = filter

  if (max && min > max) {
    throw new Error(`Wrong filter - min(${min}) is greater than max(${max})`)
  }

   // We crate a middle value for the split. If max in null, we will use double min as the middle value
    const middle = max
        ? min + Math.floor((max - min) / 2)
        : min * 2

    // We have to do the Math.max and Math.min to prevent having min > max
    const filterMin = {
        min,
        max: Math.max(middle, min),
    };
    const filterMax = {
        min: max ? Math.min(middle + 1, max) : middle + 1,
        max,
    };
    // We return 2 new filters
    return [filterMin, filterMax];
}
