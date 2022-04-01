const settings = async (request, response) => {
	response.render('users/setting', { layout: '_layouts/default' });
};

export default {
	settings,
};
