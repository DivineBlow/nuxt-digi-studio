<template>
  <div>

    <form class="vue-form" @submit.prevent="submit">
      <h6>Контакты</h6>
      <fieldset>
        <legend class="form__legend">Оставьте заявку и мы вам перезвоним!</legend>
        <div class="box__field">
          <div class="form__input">
            <img src="~/assets/img/person.svg" alt="PersonSVG">
            <input type="text" name="name" id="name" required="" placeholder="Ваше имя">
          </div>
          <div class="form__input">
            <img src="~/assets/img/phone.svg" alt="PhoneSVG">
            <input type="number" name="number" id="number" required="" placeholder="Телефон">
          </div>
        </div>
        <div class="check__box">
          <input type="checkbox" id="checkbox">
          <label class="lbl_right" for="checkbox">Я даю согласие на обработку персональных данных</label>
        </div>
        <div class="button__form">
          <button class="btn" type="submit" value="Отправка формы">Оставить заявку</button>
        </div>
      </fieldset>
    </form>

  </div>
</template>

<style lang="scss" scoped>
:root {
  font-size: 16px;
}

.vue-form {
  position: absolute;
  width: 100%;
  height: 95%;
  min-height: 550px;
  background-color: #F0ECE3;
  padding: 15px 30px;
  margin: 2050px auto;

  fieldset {
    margin: 24px 0 0 0;
    border: none;
  }

  div {
    position: relative;
    margin: 20px 0;
  }

  input[type="checkbox"] {
    width: 25px;
    height: 25px;
    color: #C4B192;
    background: #C4B192;
  }

  input[type="text"],
  input[type="number"] {
    display: block;
    width: 100%;
    appearance: none;
    padding: 12px;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  .box__field {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;

    .form__input {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      max-width: 450px;
      border-bottom: 1px solid #4B4A50;
    }

  }

  .form__legend {
    color: #818181;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 25px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ecf0f1;
  }

  .button__form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .btn {
      border: 1px solid #CCBB9E;
      background: transparent;
      padding: 12px 50px;
      margin-top: 30px;
      color: #4B4A50;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      appearance: none;
      transition: .3s;

      &:hover {
        background: rgba(215, 174, 122, 0.58);
        transition: .3s;
      }
    }
  }

  .check__box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .lbl_right {
      margin-left: 20px;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 424.99px) {
  .vue-form {
    margin: 1600px auto !important;
  }
}
</style>

<script>
export default {
  name: 'Contact',
  methods: {
    // submit form handler
    submit: function() {
      this.submitted = true;
    },
    // check or uncheck all
    checkAll: function(event) {
      this.selection.features = event.target.checked ? this.features : [];
    }
  }
}
</script>
