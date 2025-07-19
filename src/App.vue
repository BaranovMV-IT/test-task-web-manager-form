<template>
  <main class="main">
    <div class="container">
      <div class="form">
        <div class="form__header">
          <div class="form__header__title">
            Учетные записи
            <button class="form__header__title__button">
              &#10011;
            </button>
          </div>
          <div class="form__header__notes">
            <span class="form__header__notes__item">
              <span class="form__header__notes__item__icon">?</span>
              Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
            </span>
          </div>
        </div>
        <div class="form__content">
          <div class="form__content__rows">
            <div class="form__content__rows__labels">
              <div class="form__content__rows__labels__item  column_marks">Метки</div>
              <div class="form__content__rows__labels__item  column_type">Тип записи</div>
              <div class="form__content__rows__labels__item  column_login">Логин</div>
              <div class="form__content__rows__labels__item  column_password">Пароль</div>
            </div>
            <div class="form__content__rows__item">
              <div class="form__content__rows__item__input  column_marks">
                <v-textarea 
                  rows="1"
                  :hide-details="true"
                  auto-grow
                  variant="solo"
                  density="compact"
                >
                </v-textarea>
              </div>
              <div class="form__content__rows__item__input  column_type">
                <v-select 
                  :hide-details="true"
                  variant="solo"
                  density="compact"
                >
                </v-select>
                <div class="form__content__rows__item__input__arrow  fa fa-angle-down"></div>
              </div>
              <div class="form__content__rows__item__input  column_login">
                <v-text-field 
                  :hide-details="true"
                  variant="solo"
                  density="compact"
                >
                </v-text-field>
              </div>
              <div class="form__content__rows__item__input  column_password">
                <v-text-field 
                  :hide-details="true"
                  variant="solo"
                  density="compact"
                >
                </v-text-field>
                <button class="form__content__rows__item__input__eye__button">
                  <div class="form__content__rows__item__input__eye  fa fa-eye-slash"></div>
                </button>
              </div>
              <button class="form__content__rows__item__button">
                <div class="form__content__rows__item__button__bin  fa fa-trash-o"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  min-width: 1170px;
  max-width: 1170px;
  height: fit-content;
}

.form {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 35px;
    &__title {
      display: flex;
      align-items: center;
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 25px;
      &__button {
        min-width: 50px;
        max-width: 50px;
        min-height: 50px;
        max-height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: rgb(94, 94, 96);
        border: 2px solid rgb(218, 227, 235);
        border-radius: 5px;
        margin-left: 15px;
      }
    }
    &__notes {
      display: flex;
      flex-direction: column;
      &__item {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: rgb(94, 94, 96);
        padding: 5px 10px;
        background-color: rgb(238, 244, 250);
        border-radius: 5px;
        &__icon {
          min-width: 30px;
          max-width: 30px;
          min-height: 30px;
          max-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 125%;
          border: 2px solid;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    &__rows {
      display: flex;
      flex-direction: column;
      &__labels {
        display: flex;
        margin-bottom: 15px;
        &__item {
          color: rgb(185, 185, 185);
          &:last-child {
            margin-right: 55px;
          }
          &:not(:last-child) {
            margin-right: 15px;
          }
        }
      }
      &__item {
        display: flex;
        align-items: center;
        color: rgb(94, 94, 96);
        &:not(:last-child) {
          margin-bottom: 15px;
        }
        &__input {
          position: relative;
          display: flex;
          align-items: center;
          border: 2px solid rgb(218, 227, 235);
          border-radius: 5px;
          overflow: hidden;
          transition: all ease-in-out 0.25s;
          &:not(:last-child) {
            margin-right: 15px;
          }
          &:focus {
            border: 2px solid rgb(35, 169, 242);
          }
          &__arrow {
            position: absolute;
            right: 15px;
            font-size: 27.5px;
            color: rgb(94, 94, 96);
            z-index: 2;
            cursor: pointer;
          }
          &__eye {
            font-size: 22.5px;
            color: rgb(94, 94, 96);
            &__button {
              position: absolute;
              right: 15px;
              border: 0;
              min-width: 22.5px;
              max-width: 22.5px;
              min-height: 22.5px;
              max-height: 22.5px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        &__button {
          border: 0;
          min-width: 40px;
          max-width: 40px;
          min-height: 40px;
          max-height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          &__bin {
            font-size: 35px;
            color: rgb(94, 94, 96);
          }
        }
      }
    }
  }
}

.column_marks {
  min-width: 25%;
  max-width: 25%;
}
.column_type {
  min-width: 15%;
  max-width: 15%;
}
.column_login {
  flex-grow: 1;
}
.column_password {
  min-width: 25%;
  max-width: 25%;
}
.input_incorrect {
  border: 2px solid rgb(227, 61, 48);
}
</style>
