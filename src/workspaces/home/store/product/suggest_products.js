import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'product',
    resource: 'products',
    prefix: 'product.suggest_products',
    prefix_state: 'product_suggest_products',
    paginate: true,
  },
  {
    default_detail: {
      id: null,
      name: null,
      price: null,
      images: {
        url: null,
      },
      origin_id: null,
      tax_id: null,
      ingredients: null,
      hs_code: null,
    },
    default_query: {
      searchJoin: 'and',
    },
  },
).store()

export default resource
