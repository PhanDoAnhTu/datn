"use strict";
const { errorResponse } = require("../core");
const { SpuModel, Spu_AttributeModel, SkuModel } = require("../database/models");
const {
  addImageBySkuList,
  addImageBySpuId,
  ListImageByProductId,
} = require("./gallery.service");
const { newSku, allSkuBySpuId, oneSku } = require("./sku.Service");
const { spuRepository } = require("../database");
const _ = require("lodash");
const { Types } = require("mongoose");
const {
  RPCRequest,
  get_old_day_of_time,
  count_element_in_array,
} = require("../utils");
const BrandService = require("./brand.service");
const AttributeService = require("./attribute.service");
const { getCommentByproductId } = require("./comment.service");
const { findReviewByProductId } = require("./review.service");

const newSpu = async ({
  product_name,
  product_thumb = [],
  product_description,
  product_price,
  product_category,
  product_brand,
  product_weight,
  product_quantity,
  product_attributes = [],
  product_variations = [],
  sku_list = [],
  product_unit = null,
  isPublished = false,
  isDraft = true,
}) => {
  try {
    const spuFound = await SpuModel.findOne({
      product_name,
    });
    if (spuFound)
      throw new errorResponse.InternalRequestError("Tên sản phẩm đã tồn tại");

    const spu = await SpuModel.create({
      product_name,
      product_thumb:
        product_thumb?.length > 0
          ? product_thumb[0]?.thumb_url
          : sku_list[0]?.thumb_url,
      product_description,
      product_price: product_price,
      product_weight,
      product_category,
      product_quantity: product_quantity,
      product_brand,
      product_attributes,
      product_variations,
      product_unit,
      isPublished,
      isDraft,
    });

    if (spu && product_thumb?.length > 0) {
      product_thumb.forEach((image) => {
        addImageBySpuId({
          spu_id: spu._id,
          thumb_url: image.thumb_url,
          public_id: image.public_id,
        });
      });
    }
    if (spu && sku_list?.length > 0) {
      const skus = await newSku({ spu_id: spu._id, sku_list });
      sku_list.map((sku) => {
        skus.map((skuModel) => {
          if (
            (skuModel.sku_tier_idx.toString() === sku.sku_tier_idx.toString()) &
            (sku.thumb_url != null)
          ) {
            addImageBySkuList({
              spu_id: spu._id,
              sku_id: skuModel._id,
              thumb_url: sku.thumb_url,
              public_id: sku.public_id,
            });
          }
        });
      });
    }
    ////xulyproduct_attributes
    return spu;
  } catch (error) {
    console.log(`error`, error);

    return null;
  }
};

const oneSpu = async ({ spu_id, isPublished = true }) => {
  try {
    const spu = await SpuModel.findOne({
      _id: Types.ObjectId(spu_id),
      isPublished,
    });
    if (!spu) throw new errorResponse.NotFoundRequestError("spu not found");
    const skus = await allSkuBySpuId({ product_id: spu._id });

    // const product_brand = await new BrandService().findBrandById({
    //   brand_id: spu.product_brand,
    // });
    // const product_attributes = await new AttributeService().findAttributesByProductAttributes({
    //   product_attributes: spu.product_attributes,
    // });
    // const product_categories = await RPCRequest("CATEGORY_RPC", {
    //   type: "FIND_CATEGORY_BY_ID_LIST",
    //   data: {
    //     isPublished: true,
    //     category_id_list: spu.product_category,
    //   },
    // });
    return {
      spu_info: _.omit(spu, ["__v", "updateAt"]),
      // product_brand,
      // product_categories,
      // product_attributes,
      sku_list: skus.map((sku) =>
        _.omit(sku, ["__v", "updateAt", "createAt", "isDeleted"])
      ),
    };
  } catch (error) {
    return null;
  }
};
const OneProductDetail = async ({ spu_id, isPublished = true }) => {
  try {
    const spu = await SpuModel.findOne({
      _id: Types.ObjectId(spu_id),
      isPublished,
    });
    if (!spu) throw new errorResponse.NotFoundRequestError("spu not found");
    const skus = await allSkuBySpuId({ product_id: spu._id });

    const product_brand = await new BrandService().findBrandById({
      brand_id: spu.product_brand,
    });
    const product_attributes =
      await new AttributeService().findAttributesByProductAttributes({
        product_attributes: spu.product_attributes,
      });
    const product_categories = await RPCRequest("CATEGORY_RPC", {
      type: "FIND_CATEGORY_BY_ID_LIST",
      data: {
        isPublished: true,
        category_id_list: spu.product_category,
      },
    });
    return {
      spu_info: _.omit(spu, ["__v", "updateAt"]),
      product_brand,
      product_categories,
      product_attributes,
      sku_list: skus.map((sku) =>
        _.omit(sku, ["__v", "updateAt", "createAt", "isDeleted"])
      ),
    };
  } catch (error) {
    return null;
  }
};
const PublishProduct = async ({ product_id }) => {
  const spuFound = await SpuModel.findOne({
    _id: Types.ObjectId(product_id),
  });
  if (!spuFound) throw new errorResponse.NotFoundRequestError("spu not found");
  // console.log(product_id);
  return await spuRepository.publishProduct({ product_id });
};

const isTrashProduct = async ({ product_id, isDeleted = false }) => {
  const spuFound = await SpuModel.findOne({
    _id: Types.ObjectId(product_id),
  });
  if (!spuFound) throw new errorResponse.NotFoundRequestError("spu not found");
  if (isDeleted === true) {
    spuFound.isDraft = false;
    spuFound.isPublished = false;
  }
  if (isDeleted === false) {
    spuFound.isDraft = true;
    spuFound.isPublished = false;
  }
  spuFound.isDeleted = isDeleted;

  return await spuFound.updateOne(spuFound);
};

const UnPublishProduct = async ({ product_id }) => {
  const spuFound = await SpuModel.findOne({
    _id: Types.ObjectId(product_id),
  }).lean();
  if (!spuFound) throw new errorResponse.NotFoundRequestError("spu not found");
  return await spuRepository.unPublishProduct({ product_id });
};

const AllProducts = async ({ sort = "ctime", isPublished = true }) => {
  const all_Products = await spuRepository.getAllProducts({
    sort,
    isPublished,
  });
  if (all_Products.length == 0) return null;
  let product_list = {
    all_Products: [],
  };
  let brand_list = [];
  let sku_list = [];
  let product_review = [];
  // let product_images = [];

  for (let index = 0; index < all_Products.length; index++) {
    const brand = await new BrandService().findBrandById({
      brand_id: all_Products[index].product_brand,
    });
    brand_list.push(brand);
    const skulist = await allSkuBySpuId({
      product_id: all_Products[index]._id,
    });
    sku_list.push(skulist);
    const review = await findReviewByProductId({
      product_id: all_Products[index]._id,
      isPublished: true,
    });
    product_review.push(review);
    //  const productImages = await ListImageByProductId({ product_id: all_Products[index]._id })
    //  product_images.push(productImages)
  }
  const specialoffer = await RPCRequest("SPECIAL_OFFER_RPC", {
    type: "FIND_SPECIAL_OFFER_BY_DATE",
    data: {
      special_offer_is_active: true,
    },
  });
  product_list.all_Products = await all_Products.map((product, index) => {
    return {
      ...product,
      brand: brand_list[index],
      special_offer: specialoffer,
      sku_list: sku_list[index],
      product_review: product_review[index],
      // product_images: product_images[index]
    };
  });

  return product_list.all_Products;
};
const getAllProductsByfilter = async ({
  limit = 50,
  sort = "ctime",
  page = 1,
  filter = { isPublished: true },
}) => {
  const all_Products = await spuRepository.getAllProductsByfilter({
    limit,
    sort,
    page,
    filter,
  });
  if (all_Products.length == 0) return null;
  let product_list = {
    all_Products: [],
  };
  let brand_list = [];
  let sku_list = [];
  let product_review = [];
  // let product_images = [];

  for (let index = 0; index < all_Products.length; index++) {
    const brand = await new BrandService().findBrandById({
      brand_id: all_Products[index].product_brand,
    });
    brand_list.push(brand);
    const skulist = await allSkuBySpuId({
      product_id: all_Products[index]._id,
    });
    sku_list.push(skulist);
    const review = await findReviewByProductId({
      product_id: all_Products[index]._id,
      isPublished: true,
    });
    product_review.push(review);
    // const productImages = await ListImageByProductId({ product_id: all_Products[index]._id })
    // product_images.push(productImages)
  }
  const specialoffer = await RPCRequest("SPECIAL_OFFER_RPC", {
    type: "FIND_SPECIAL_OFFER_BY_DATE",
    data: {
      special_offer_is_active: true,
      date: Date.now(),
    },
  });
  product_list.all_Products = await all_Products.map((product, index) => {
    return {
      ...product,
      brand: brand_list[index],
      special_offer: specialoffer,
      sku_list: sku_list[index],
      product_review: product_review[index],
      // product_images: product_images[index]
    };
  });

  return product_list.all_Products;
};
const findProductsByCategory = async ({
  limit = 50,
  sort = "ctime",
  page = 1,
  filter = { isPublished: true, category_id: null },
}) => {
  let product_list = {
    productsByCategory: [],
  };
  const productsByCategory = await spuRepository.findProductsByCategory({
    limit,
    sort,
    page,
    filter,
  });
  if (productsByCategory.length == 0) return null;
  let brand_list = [];
  let sku_list = [];
  let product_review = [];
  // let product_images = [];

  for (let index = 0; index < productsByCategory.length; index++) {
    const brand = await new BrandService().findBrandById({
      brand_id: productsByCategory[index].product_brand,
    });
    brand_list.push(brand);
    const skulist = await allSkuBySpuId({
      product_id: productsByCategory[index]._id,
    });
    sku_list.push(skulist);
    const review = await findReviewByProductId({
      product_id: productsByCategory[index]._id,
      isPublished: true,
    });
    product_review.push(review);
    // const  productImages = await ListImageByProductId({ product_id: productsByCategory[index]._id })
    // product_images.push(productImages)
  }
  const special_offer = await RPCRequest("SPECIAL_OFFER_RPC", {
    type: "FIND_SPECIAL_OFFER_BY_DATE",
    data: {
      special_offer_is_active: true,
    },
  });

  product_list.productsByCategory = await productsByCategory.map(
    (product, index) => {
      return {
        ...product,
        brand: brand_list[index],
        special_offer: special_offer,
        sku_list: sku_list[index],
        product_review: product_review[index],
        // product_images: product_images[index]
      };
    }
  );

  return product_list.productsByCategory;
};
const findProductDetail = async ({ spu_id, isPublished = true }) => {
  try {
    const { spu_info, sku_list } = await oneSpu({ spu_id, isPublished });
    let product = {
      product_detail: {},
      special_offer: null,
      sku_list: [],
      product_brand: {},
      product_categories: [],
      product_attributes: [],
      related_products: [],
      product_comment: [],
      product_review: [],
      product_images: [],
    };
    product.product_detail = spu_info ? spu_info : {};
    product.sku_list = sku_list ? sku_list : [];
    product.product_brand = await new BrandService().findBrandById({
      brand_id: spu_info.product_brand,
    });
    product.product_attributes =
      await new AttributeService().findAttributesByProductAttributes({
        product_attributes: spu_info.product_attributes,
      });
    product.related_products = await SpuModel.find({
      isPublished: true,
      _id: {
        $ne: spu_info._id,
      },
      product_category: {
        $in: spu_info.product_category,
      },
    }).lean();
    // product.product_comment = await getCommentByproductId({ productId: spu_info._id })
    product.product_review = await findReviewByProductId({
      product_id: spu_info._id,
      isPublished: true,
    });
    const promotion = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_BY_DATE",
      data: {},
    });
    product.special_offer = promotion ? promotion : null;
    const categories = await RPCRequest("CATEGORY_RPC", {
      type: "FIND_CATEGORY_BY_ID_LIST",
      data: {
        isPublished: true,
        category_id_list: spu_info.product_category,
      },
    });
    product.product_categories = categories ? categories : [];
    product.product_images = await ListImageByProductId({
      product_id: spu_info._id,
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const productFromCart = async ({ spu_id, isPublished = true }) => {
  try {
    const spu = await SpuModel.findOne({
      _id: Types.ObjectId(spu_id),
      isPublished,
    });
    if (!spu) throw new errorResponse.NotFoundRequestError("spu not found");

    const skus = await allSkuBySpuId({ product_id: spu._id });
    const product_brand = await new BrandService().findBrandById({
      brand_id: spu.product_brand,
    });
    const special_offer = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_BY_DATE",
      data: {
        special_offer_is_active: true,
        date: Date.now(),
      },
    });
    return {
      spu_info: _.omit(spu, ["__v", "updateAt"]),
      sku_list: skus.map((sku) =>
        _.omit(sku, ["__v", "updateAt", "createAt", "isDeleted"])
      ),
      product_brand,
      special_offer,
    };
  } catch (error) {
    return null;
  }
};
const AllProductsOption = async ({ sort = "ctime", isPublished }) => {
  let all_Products = [];
  if (isPublished !== undefined) {
    all_Products = await spuRepository.getAllProducts({
      sort,
      isPublished,
    });
  } else {
    all_Products = await SpuModel.find().lean();
  }

  if (all_Products.length == 0) return [];
  let product_list = {
    all_Products: [],
  };
  let brand_list = [];
  let sku_list = [];
  for (let index = 0; index < all_Products.length; index++) {
    const brand = await new BrandService().findBrandById({
      brand_id: all_Products[index].product_brand,
    });
    brand_list.push(brand);
    const skulist = await allSkuBySpuId({
      product_id: all_Products[index]._id,
    });
    sku_list.push(skulist);
  }

  product_list.all_Products = await all_Products.map((product, index) => {
    return {
      ...product,
      brand: brand_list[index],
      sku_list: sku_list[index],
    };
  });

  return product_list.all_Products;
};
const AllProducts_management = async ({ sort = "ctime" }) => {
  const all_Products = await spuRepository.getAllProducts({
    sort,
  });
  if (all_Products.length == 0) return null;
  let product_list = {
    all_Products: [],
  };
  let brand_list = [];
  let sku_list = [];
  for (let index = 0; index < all_Products.length; index++) {
    const brand = await new BrandService().findBrandById({
      brand_id: all_Products[index].product_brand,
    });
    brand_list.push(brand);
    const skulist = await allSkuBySpuId({
      product_id: all_Products[index]._id,
    });
    sku_list.push(skulist);
  }

  product_list.all_Products = await all_Products.map((product, index) => {
    return {
      ...product,
      brand: brand_list[index],
      sku_list: sku_list[index],
    };
  });

  return product_list.all_Products;
};

const findProductBestSelling = async ({
  limit = 50,
  page = 1,
  isPublished = true,
}) => {
  const ordersBySuccessful = await RPCRequest("ORDER_RPC", {
    type: "FIND_ORDER_BY_STATUS_AND_AROUND_DAY",
    data: {
      order_status: { $in: ["review", "successful"] },
      numberDay: 30,
    },
  });
  // console.log("ordersBySuccessful", ordersBySuccessful)
  let listIdProduct = [];
  if (ordersBySuccessful.length > 0) {
    ordersBySuccessful.forEach((order) => {
      order.order_product.item_products.forEach((prod) => {
        listIdProduct.push(prod.productId);
      });
    });
  }
  // console.log("listIdProduct", listIdProduct)

  const sortArr = listIdProduct.sort(
    (a, b) =>
      count_element_in_array(listIdProduct, b) -
      count_element_in_array(listIdProduct, a)
  );
  // console.log("sortArr", sortArr)

  const skip = (page - 1) * limit;
  const products = await SpuModel.find({
    _id: {
      $in: sortArr,
    },
    isPublished,
  })
    .limit(limit)
    .skip(skip);

  return products;
};

const checkProductById = async ({ productId }) => {
  return await spuRepository.getProductById({ productId });
};

// const checkProductByServer = async ({ products }) => {
//   return await spuRepository.checkProductByServer({ products });
// };
const checkProductByServer = async ({ products }) => {
  return await Promise.all(
    products.map(async (product) => {
      if (product?.sku_id !== null && product?.sku_id !== undefined) {
        console.log("1")
        const foundSku = await oneSku({
          product_id: product.productId,
          sku_id: product.sku_id,
        });
        // console.log("foundSku",foundSku)

        if (foundSku) {
          return {
            price: foundSku.sku_price,
            quantity: product.quantity,
            productId: product.productId,
            sku_id: foundSku._id,
          };
        }
      } else {
        const foundProduct = await spuRepository.getProductById(
          { productId: product.productId }
        );
        if (foundProduct) {
          return {
            price: foundProduct.product_price,
            quantity: product.quantity,
            productId: product.productId,
            sku_id: null,
          };
        }
      }
    })
  );
};

const newSpuAttribute = async ({ attribute_id, spu_id, attribute_value }) => {
  try {
    const spuAttributes = await Spu_AttributeModel.create({
      attribute_id,
      spu_id,
      attribute_value,
    });
    return spuAttributes;
  } catch (error) {
    console.log(`error`);
    return null;
  }
};
const findAttributeBySpuId = async ({ spu_id }) => {
  try {
    const spuAttributes = await Spu_AttributeModel.find({
      spu_id,
    });
    return spuAttributes;
  } catch (error) {
    console.log(`error`);
    return null;
  }
};


const updateQuantityProduct = async ({ productId, quantity }) => {
  return await SpuModel.updateOne({
    _id: productId
  }, {
    $inc: {
      product_quantity: -quantity
    }
  })
}
const updateQuantitySku = async ({ sku_id, quantity }) => {
  return await SkuModel.updateOne({
    _id: sku_id
  }, {
    $inc: {
      sku_stock: -quantity
    }
  })
}

const updateQuantityAfterCheckout = async ({ item_products }) => {
  try {
    if (item_products.length > 0) {
      item_products.map((product) => {
        if (product?.sku_id !== null) {
          updateQuantitySku({ sku_id: product.sku_id, quantity: product.quantity })
        }
        updateQuantityProduct({ productId: product.productId, quantity: product.quantity })
      })
    }
  } catch (error) {
    console.log(`error`);
    return null;
  }
};

const serverRPCRequest = async (payload) => {
  const { type, data } = payload;
  const { products, productId } = data;
  switch (type) {
    case "CHECK_PRODUCT_BY_SERVER":
      return checkProductByServer({ products });
    case "CHECK_PRODUCT_BY_ID":
      return checkProductById({ productId });
    case "UPDATE_QUANTITY_AFTER_CHECKOUT":
      return updateQuantityAfterCheckout({ item_products });
    default:
      break;
  }
};

module.exports = {
  newSpu,
  oneSpu,
  serverRPCRequest,
  checkProductByServer,
  PublishProduct,
  AllProducts,
  getAllProductsByfilter,
  UnPublishProduct,
  checkProductById,
  newSpuAttribute,
  findAttributeBySpuId,
  findProductsByCategory,
  findProductDetail,
  productFromCart,
  AllProductsOption,
  findProductBestSelling,
  isTrashProduct,
  OneProductDetail,
  AllProducts_management,
  updateQuantityAfterCheckout
};
