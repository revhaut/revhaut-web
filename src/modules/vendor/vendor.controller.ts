import { Request, Response } from 'express';

const index = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Dashboard',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/dashboard', { layout: '_layouts/vendor', locals });
};

const product = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Product',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/product', { layout: '_layouts/vendor', locals });
};

const createProduct = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Product',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/product', { layout: '_layouts/vendor', locals });
};

const transaction = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Transaction',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/transaction', { layout: '_layouts/vendor', locals });
};

const personalInformation = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Personalinfo',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/settings/personal-info', { layout: '_layouts/vendor', locals });
};
const payout = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Payout',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/settings/payout', { layout: '_layouts/vendor', locals });
};
const notification = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Notification',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/settings/notification', { layout: '_layouts/vendor', locals });
};
const security = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Security',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/settings/security', { layout: '_layouts/vendor', locals });
};
const sales = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Sale',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('vendors/sale', { layout: '_layouts/vendor', locals });
};

export default {
  index,
  transaction,
  security,
  notification,
  payout,
  personalInformation,
  sales,
  product,
  createProduct,
};
