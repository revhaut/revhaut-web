import { Request, Response } from 'express';

const index = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('admins/dashboard', { layout: '_layouts/backoffice', locals });
};

const vendorDashboard = async (req: Request, res: Response) => {
  const locals = {
    title: 'dashboard',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return res.render('dashboard/vendor', { layout: '_layouts/authenticate', locals });
};

export default {
  index,
  vendorDashboard,
};
