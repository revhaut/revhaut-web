const index = async (request, response) => {
  const locals = {
    title: 'dashboard',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('admins/dashboard', {
    layout: '_layouts/backoffice',
    locals,
  });
};

const vendorDashboard = async (request, response) => {
  const locals = {
    title: 'dashboard',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('dashboard/vendor', {
    layout: '_layouts/authenticate',
    locals,
  });
};

export default {
  index,
  vendorDashboard,
};
