"use strict";
const { errorResponse } = require("../core");
const { SpuModel, Spu_AttributeModel } = require("../database/models");
const { addImageBySkuList, addImageBySpuId } = require("./gallery.service");
const { newSku, allSkuBySpuId } = require("./sku.Service");
const { spuRepository } = require("../database");
const _ = require("lodash");
const { Types } = require("mongoose");
const { RPCRequest } = require("../utils");
const BrandService = require("./brand.service");
const AttributeService = require("./attribute.service");
const { getCommentByproductId } = require("./comment.service");
const { findReviewByProductId } = require("./review.service");
const newSpu = async ({
  product_name,
  product_thumb = [],
  product_description,
  product_slug,
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
      product_slug,
      product_price,
      product_weight,
      product_category,
      product_quantity,
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

    return {
      spu_info: _.omit(spu, ["__v", "updateAt"]),
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
  console.log(product_id);
  return await spuRepository.publishProduct({ product_id });
};

const UnPublishProduct = async ({ product_id }) => {
  const spuFound = await SpuModel.findOne({
    _id: Types.ObjectId(product_id),
  });
  if (!spuFound) throw new errorResponse.NotFoundRequestError("spu not found");
  console.log(product_id);
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
  let special_offer = [];
  let sku_list = [];
  let product_review = [];
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
    const specialoffer = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_TODAY_BY_ID",
      data: {
        special_offer_is_active: true,
        spu_id: all_Products[index]._id,
      },
    });
    special_offer.push(specialoffer);
  }

  product_list.all_Products = await all_Products.map((product, index) => {
    return {
      ...product,
      brand: brand_list[index],
      special_offer: special_offer[index],
      sku_list: sku_list[index],
      product_review: product_review[index],
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
  let special_offer = [];
  let sku_list = [];
  let product_review = [];
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
    const specialoffer = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_TODAY_BY_ID",
      data: {
        special_offer_is_active: true,
        spu_id: all_Products[index]._id,
      },
    });
    special_offer.push(specialoffer);
  }

  product_list.all_Products = await all_Products.map((product, index) => {
    return {
      ...product,
      brand: brand_list[index],
      special_offer: special_offer[index],
      sku_list: sku_list[index],
      product_review: product_review[index],
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
    // const specialoffer = await RPCRequest("SPECIAL_OFFER_RPC", {
    //     type: "FIND_SPECIAL_OFFER_TODAY_BY_ID",
    //     data: {
    //         special_offer_is_active: true,
    //         spu_id: productsByCategory[index]._id
    //     }
    // })
    // special_offer.push(specialoffer)
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
      special_offer: {},
      sku_list: [],
      product_brand: {},
      product_categories: [],
      product_attributes: [],
      related_products: [],
      product_comment: [],
      product_review: [],
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
    });
    // product.product_comment = await getCommentByproductId({ productId: spu_info._id })
    product.product_review = await findReviewByProductId({
      product_id: spu_info._id,
      isPublished: true,
    });
    product.special_offer = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_TODAY_BY_ID",
      data: {
        special_offer_is_active: true,
        spu_id: product.product_detail._id,
      },
    });
    const categories = await RPCRequest("CATEGORY_RPC", {
      type: "FIND_CATEGORY_BY_ID_LIST",
      data: {
        isPublished: true,
        category_id_list: spu_info.product_category,
      },
    });
    product.product_categories = categories ? categories : [];

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
      type: "FIND_SPECIAL_OFFER_TODAY_BY_ID",
      data: {
        special_offer_is_active: true,
        spu_id: spu._id,
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
// const products_checkout = async ({ spu_id_list, isPublished = true, products_checkout = [] }) => {
//     try {
//         const spu = await SpuModel.find({
//             _id: {
//                 $in: spu_id_list
//             },
//             isPublished
//         })
//         if (spu.length == 0) throw new errorResponse.NotFoundRequestError('spu not found')
//         let products = []
//         let brand_list = []
//         let sku_list = []
//         let price = []
//         for (let index = 0; index < spu.length; index++) {
//             const brand = await new BrandService().findBrandById({ brand_id: spu[index].product_brand })
//             brand_list.push(brand)
//             const skulist = await allSkuBySpuId({ product_id: spu[index]._id })
//             sku_list.push(skulist)
//         }
//         const special_offer = await RPCRequest("SPECIAL_OFFER_RPC", {
//             type: "FIND_SPECIAL_OFFER_BY_DATE",
//             data: {
//                 special_offer_is_active: true,
//             }
//         })

//         products = await spu.map((product, index) => {
//             return { ...product, brand: brand_list[index], special_offer: special_offer, sku_list: sku_list[index] }
//         })

//         return products

//     } catch (error) {
//         return null
//     }
// }

const checkProductById = async ({ productId }) => {
  return await spuRepository.getProductById({ productId });
};

const checkProductByServer = async ({ products }) => {
  return await spuRepository.checkProductByServer({ products });
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
const serverRPCRequest = async (payload) => {
  const { type, data } = payload;
  const { products, productId } = data;
  switch (type) {
    case "CHECK_PRODUCT_BY_SERVER":
      return checkProductByServer({ products });
    case "CHECK_PRODUCT_BY_ID":
      return checkProductById({ productId });
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
};
