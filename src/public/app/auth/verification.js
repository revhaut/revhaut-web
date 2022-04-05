$(document).ready(function() {
  var auth = {
      init: function() {
          this.dom();
          this.event();
      },
      dom: function() {
          $this = this;
          var $wrapper = $('.verification');
          $this.token = $wrapper.find('.token');
          $this.email = $wrapper.find('.email');
          $this.submit = $wrapper.find('.verify-btn');
      },
      event: function() {
          $this.submit.on('click', this.verification.bind(this));
      },
      verification: function(e) {
          e.preventDefault();
          var data = {
            email:this.email.val(),
            token: this.token.val()
          };
          console.log(data)
          var token = $('meta[name="csrf-token"]').attr('content');
          $.ajax({
              type: 'POST',
              url: '/api/account/verification',
              headers: {
                  'CSRF-Token': token,
              },
              data:{...data},
              success: function(response) {
                  console.log(response);

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