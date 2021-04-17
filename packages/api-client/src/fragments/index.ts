export const productFragment = `
  id
  type_id
  sku
  name
  price_range {
    minimum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
    }
  }
  image {
    url
  }
`;

export const cartFragment = `
  id
  applied_coupons {
    code
  }
  prices {
      subtotal_excluding_tax {
        value
      },
      subtotal_including_tax {
        value
      },
      applied_taxes {
        amount {
          value
        },
        label
      }
      discounts {
        amount {
          value
        },
        label
      }
      grand_total {
        value
      }
  }
  shipping_addresses {
    selected_shipping_method {
      amount {
        currency
        value
      },
      carrier_code
      method_code,
      carrier_title
      method_title
    }
  }
  billing_address {
    firstname
    lastname
    street
    city
    postcode
    telephone
    country {
      code
      label
    }
  }
  items {
    id
    product {
        ${productFragment}
    }
    prices {
      row_total {
        value
      }
      row_total_including_tax {
        value
      }
      total_item_discount {
        value
      }
    }
    quantity
  }
  total_quantity
`;

export const customerFragment = `
  email
  firstname
  is_subscribed
  lastname
  middlename
  prefix
  suffix
  taxvat
  default_billing
  default_shipping
  addresses {
    firstname
    lastname
    street
    city
    region {
      region_code
      region
    }
    postcode
    country_code
    telephone
  }
`;
