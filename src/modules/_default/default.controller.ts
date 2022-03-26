import { Request, Response } from 'express';

const homeController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Revhaut Home Page',
    page_name: 'home',
  };
  res.render('index', { layout: '_layouts/default', locals });
};
const aboutController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Revhaut About Us',
    page_name: 'about-us',
  };
  res.render('about-us', { layout: '_layouts/default', locals });
};
const contactController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Revhaut Home Page',
    class: 'active',
    page_name: 'about',
  };
  res.render('contact-us', { layout: '_layouts/default', locals });
};

const faqController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Revhaut Home Page',
    class: 'active',
    page_name: 'about',
  };
  res.render('faq', { layout: '_layouts/default' });
};

const privacyController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Revhaut Home Page',
    class: 'active',
    page_name: 'about',
  };
  res.render('privacy-policy', { layout: '_layouts/default' });
};

const termsController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Revhaut Home Page',
    page_name: 'about',
  };
  res.render('terms-condition', { layout: '_layouts/default', locals });
};

const vendoreController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Vendor  Page',
    page_name: 'vendor',
  };
  res.render('vendor', { layout: '_layouts/default', locals });
};

const affiliateController = async (req: Request, res: Response) => {
  const locals = {
    title: 'Affiliate  Page',
    page_name: 'affiliate',
  };
  res.render('affiliate', { layout: '_layouts/default', locals });
};

export default {
  homeController,
  aboutController,
  contactController,
  termsController,
  privacyController,
  faqController,
  vendoreController,
  affiliateController,
};
