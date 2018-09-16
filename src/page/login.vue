<template>
  <div class="content-first">
    <canvas ref="hackBg" class="hackBg"></canvas>
    <div class="login-box">
      <div ref="userForm" class="login-form">
        <div><input class="form-control" placeholder="用户名" v-model="userName" @keyup.enter="login"/></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        userName: '',
        textArr: '少年哟，请随便输入一个账号哟！'
      }
    },
    mounted() {
      var a = this.$route.params;

      this.initHack();
    },
    computed: {
      len() {
        return this.textArr.length;
      }
    },
    methods: {
      login() {
        if (!this.userName) {
          this.textArr = '少年，不能为空的呀！！！';
          setTimeout(function () {
            this.textArr = '少年哟，请随便输入一个账号哟！';
          }.bind(this), 3000);
          return;
        }
        let user = {
          name: this.userName
        };
        this.$store.commit('setUser', user);
        this.$router.go(-1);
      },
      initHack() {
        var _this = this;
        var hackBg = this.$refs.hackBg;
        var s = window.screen;
        var width = hackBg.width = s.width;
        var height = hackBg.height = s.height;
        var letters = Array(256).join(1).split('');
        var num = -1;
        var draw = function () {
          num = (num + 1) % _this.len;
          hackBg.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
          hackBg.getContext('2d').fillRect(0, 0, width, height);
          hackBg.getContext('2d').fillStyle = '#0F0';
          letters.map(function (y_pos, index) {
            var text = _this.textArr[num];//  String.fromCharCode(3e4 + Math.random() * 33);
            var x_pos = index * 10;
            hackBg.getContext('2d').fillText(text, x_pos, y_pos);
            letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
          });
        };
        setInterval(draw, 33);
        setTimeout(function () {
          _this.$refs.userForm.classList.add('active');
        }, 3000)
      }
    }
  }
</script>

<style scoped lang="less">
  .hackBg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .login-form {
    position: absolute;
    width: 100px;
    margin-top: -150px;
    opacity: 0;
    transition: all 0.8s;
  }

  .login-form.active {
    max-width: 240px;
    width: 80%;
    opacity: 1;
    margin-top: -80px;
  }

</style>
