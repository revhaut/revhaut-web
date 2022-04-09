$(document).ready(function() {
    var auth = {
        init: function() {
            this.dom();
            this.event();
        },
        dom: function() {
            $this = this;
            var $wrapper = $('.account');
            $this.first_name = $wrapper.find('.firstname');
            $this.last_name = $wrapper.find('.lastname');
            $this.email = $wrapper.find('.email');
            $this.phone = $wrapper.find('.phone');
            $this.country = $wrapper.find('._country');
            $this.state = $wrapper.find('.state');
            $this.password = $wrapper.find('.password');
            $this.confirm_password = $wrapper.find('.confirm-password');
            $this.user_type = $wrapper.find('.user-type');
            $this.submit = $wrapper.find('.create-account');
        },
        event: function() {
            $this.submit.on('click', this.create.bind(this));
            $this.country.on('change', this.getCountryState);
        },

        create: function(e) {
            e.preventDefault();
            var data = {
                first_name: this.first_name.val(),
                last_name: this.last_name.val(),
                email: this.email.val(),
                phone: this.phone.val(),
                country: this.country.val(),
                state: this.state.val(),
                password: this.password.val(),
                user_type: this.user_type.val(),
            };
            var token = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                type: 'POST',
                url: '/api/account/register',
                headers: {
                    'CSRF-Token': token,
                },
                data: data,
                success: function(response) {
                    if (response.errors) {
                        alert(response.messsage);
                    }
                    window.location.href = response.data.url;
                },
            });
        },
        getCountry: function() {},
        getCountryState: function() {
            const country_code = $(this).val();
            var token = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                type: 'POST',
                url: '/api/countries/state',
                headers: {
                    'CSRF-Token': token,
                },
                data: { country_code },
                success: function(response) {
                    if (response.error) {
                        auth.notify(response.messsage, 'error');
                    }
                    $('.state').empty();
                    $('.state').append($('<option></option>').val('').html('--Select State--'));
                    $.each(response.data, function(i, p) {
                        $('.state').append($('<option></option>').val(p.isoCode).html(p.name));
                    });
                    $('.state').niceSelect('update');
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