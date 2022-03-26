import { Request, Response } from 'express';

const index = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Dashboard',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/dashboard', { layout: '_layouts/authenticate', locals });
};
const marketPlace = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Marketplace',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/market-place', { layout: '_layouts/authenticate', locals });
};
const transaction = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Transaction',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/transaction', { layout: '_layouts/authenticate', locals });
};
const refferals = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Refferral',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/refferral', { layout: '_layouts/authenticate', locals });
};
const setting = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Setting',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/settings', { layout: '_layouts/authenticate', locals });
};
const personalInformation = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Personalinfo',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/settings/personal-info', { layout: '_layouts/authenticate', locals });
};
const payout = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Payout',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/settings/payout', { layout: '_layouts/authenticate', locals });
};
const notification = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Notification',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/settings/notification', { layout: '_layouts/authenticate', locals });
};
const security = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Security',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/settings/security', { layout: '_layouts/authenticate', locals });
};
const sales = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    page: 'Sale',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('affiliates/sale', { layout: '_layouts/authenticate', locals });
};

export default {
  index,
  marketPlace,
  transaction,
  refferals,
  setting,
  security,
  notification,
  payout,
  personalInformation,
  sales,
};
