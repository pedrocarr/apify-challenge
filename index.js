import axios from 'axios'
import { PIVOT_PRICE_RANGES, MAX_PRODUCTS_PAGINATION } from './const.js'
import { createFilterUrl, splitFilter } from './utils.js'

async function fetchAllProducts() {
    const products = []
    const queue = []

    for (const { min, max } of PIVOT_PRICE_RANGES) {
        queue.push({ min, max })
    }

    while (queue.length > 0) {
        const { min, max } = queue.shift()
        const url = createFilterUrl({ min, max })

        try {
            const response = await axios.get(url)
            const data = response.data

            if (data.total <= MAX_PRODUCTS_PAGINATION) {
                products.push(...data.products)
            } else {
                // Too many products, split range and re-queue
                const newFilters = splitFilter({ min: min * 100, max: max ? max * 100 : null })
                for (const filter of newFilters) {
                    queue.push({
                        min: filter.min / 100,
                        max: filter.max ? filter.max / 100 : null,
                    });
                }
            }
        } catch (error) {
            console.error(`Failed to fetch URL: ${url}`, error)
        }
    }

    return products
  }

fetchAllProducts().then((products) => {
    console.log(`Total products fetched: ${products.length}`)
});
