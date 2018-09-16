var needLogin = {
  created: function () {
    if (this.$store.state.conn.user == null) {
      this.$router.push({name: 'login'})
    } else {
      this.changeMenu(this.menuCheck);
    }
  }
};

export {
  needLogin
}
