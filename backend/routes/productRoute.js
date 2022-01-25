const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  GetProductDetail,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get( getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,autherizeRoles("admin") , createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, autherizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, autherizeRoles("admin"), deleteProduct)

router.route("/product/:id") .get(GetProductDetail);  

router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteProductReviews)
module.exports = router;
