const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const userSchema = require('../user/schema/user.schema');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const sharedService = require('../../shared/shared.service');
const ProductRepository = require('./product.repository');
const productSchema = require('./schema/product.schema');
const productRepository = require('./product.repository');
const productService = require('./product.service');

class ProductController {
  async productWeb(request, response) {
    const locals = {
      title: 'register',
      scripts: [''],
    };
    return response.render('vendors/product', {
      layout: '_layouts/vendor',
      locals,
      csrfToken: request.csrfToken(),
    });
  }

  async productListWeb(request, response) {
    const products = await sharedService.queryHandler(ProductRepository.findAll());
    const locals = {
      title: 'account registration',
      scripts: [''],
    };
    return response.render('vendors/product', {
      layout: '_layouts/vendor',
      locals,
      products: products.data,
      csrfToken: request.csrfToken(),
    });
  }

  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @returns
   */
  async productCreateWeb(request, response) {
    const categories = await sharedService.queryHandler(ProductRepository.getCategories());
    const locals = {
      title: 'Add New Product',
      scripts: [''],
    };
    return response.render('vendors/create-product', {
      layout: '_layouts/vendor',
      locals,
      categories: categories.data,
      csrfToken: request.csrfToken(),
    });
  }
  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @returns
   * @description handles create request for products on template frontend
   */
  async productCreateWebPost(request, response) {
    try {
      const { errors, data } = schemaValidator(productSchema.createProduct, {
        ...request.body,
      });
      if (errors) {
        return HttpStatusCode.INVALID_REQUEST({ response, errors });
      }

      const newProduct = {
        category_id: request.body.category,
        description: request.body.description,
        product_url: 'http://loremflickr.com/640/480/business', //TODO: implement file upload
        product_slug: request.body.product_slug,
        default_access_email: request.body.default_email,
        default_password: request.body.default_password,
        percentage: Number(request.body.percentage),
        name: request.body.product_name,
        product_amount: Number(request.body.amount),
        vendor_id: '59ad23dd-e151-4d4e-a054-154d79845793', //TODO: await authmodule
        is_publish: false,
        is_deleted: false,
        product_ref: productService.generateProductRef(),
      };

      const { data: result, message } = await productRepository.create(newProduct);

      return response.send({ data, message });
    } catch (error) {
      //TODO: errorhandler
      return response.send(error);
    }
  }

  async createProductApi(request, response) {
    const { body } = request;
    try {
      const { errors, data } = schemaValidator(userSchema.createAccountSchema, {
        ...body,
      });
      if (errors) {
        return HttpStatusCode.INVALID_REQUEST({ response, errors });
      }

      return response.status(201).json({
        status: 'success',
        body: request.body,
      });

      //const { data: result, message } = await UserService.register(data);
      //await emailService.sendVericationMail(authData);
      // return HttpStatusCode.CREATED({ response, message, data: result });
    } catch (error) {
      return HttpStatusCode.UNPROCCESSABLE_ENTITY({
        response,
        message: error.message,
      });
    }
  }
  async fetchProductApi(request, response) {
    const { body } = request;
    try {
      const { errors, data } = schemaValidator(userSchema.createAccountSchema, {
        ...body,
      });
      if (errors) {
        return HttpStatusCode.INVALID_REQUEST({ response, errors });
      }

      //const { data: result, message } = await UserService.register(data);
      //await emailService.sendVericationMail(authData);
      return HttpStatusCode.CREATED({ response, message, data: result });
    } catch (error) {
      return HttpStatusCode.UNPROCCESSABLE_ENTITY({
        response,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
