module.exports = {
  getToken: function() {
    return window.localStorage.token
  },
  loggedIn: function() {
    return !!window.localStorage.token
},
  logout: function() {
      delete window.localStorage.token
      return
  }
}
