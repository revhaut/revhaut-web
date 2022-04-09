$(document).ready(function() {
    var auth = {
        init: function() {
            this.dom();
            this.event();
        },
        dom: function() {
            $this = this;
            var $wrapper = $('.wrapper');
            $this.password = $wrapper.find('.password');
            $this.email = $wrapper.find('.email');
            $this.submit = $wrapper.find('.btn-login');
        },
        event: function() {
            $this.submit.on('click', this.login.bind(this));
        },
        login: function(e) {
            e.preventDefault();
            var data = {
                email: this.email.val(),
                password: this.password.val(),
            };

            var token = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                type: 'POST',
                url: '/api/account/Login',
                headers: {
                    'CSRF-Token': token,
                },
                data: {...data },
                success: function(response) {
                    if (response.errors) {
                        alert(response.messsage);
                    }
                    window.location.href = response.data.url;
                },
            });
        },
        notify: function(title, text, icon) {
            Swal.fire({
                title,
                text,
                icon,
            });
        },
    };
    auth.init();
});