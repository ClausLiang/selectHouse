let domain = '';
if (process.env.NODE_ENV === 'development') { domain = '/test'}
if (process.env.NODE_ENV === 'production') { domain = 'xx'}

module.exports = {
  HEADER: function () {
    return {
      'Content-Type': 'application/json',
      "token": '',
      'AJAX': 'ajax'
    };
  },
  LOGIN: `${domain}/login`
}
