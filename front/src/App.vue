<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card mb-3" style="max-width: 540px">
          <div class="col-auto">
            <div class="card-body">
              <h5 class="card-title">Envios</h5>
              <p class="card-body"></p>
              <form action class="form" @submit.prevent="contact">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Monto</label
                  >
                  <input
                    type="number"
                    v-model="amount"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="user_id"
                  >
                    <option selected>Seleccione</option>
                    <option
                      v-for="(user, index) in users"
                      :key="index"
                      :value="user.id"
                    >
                      {{ user.name }}
                    </option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">
                  Enviar Monto
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      users: null,
      amount: null,
      user_id: "",
    };
  },

  mounted() {
    this.getAll();
  },

  methods: {
    getAll() {
      axios
        .get("http://127.0.0.1:8000/api/user")
        .then((resp) => {
          this.users = resp.data;
        })
        .catch((e) => console.log(e));
    },

    contact() {
      if (!this.amount) {
        return this.$swal({
          icon: "error",
          title: "Oops...",
          text: "El monto es obligatorio.",
        });
      }
      if (!this.user_id) {
        return this.$swal({
          icon: "error",
          title: "Oops...",
          text: "El usuario es obligatorio..",
        });
      }

      let data = {
        amount: this.amount,
        user_id: this.user_id,
      };

      axios
        .post("http://127.0.0.1:8000/api/amount", data)
        .then((resp) => {
          console.log(resp);
          this.amount = "";
          this.user_id = "";
          this.$swal({
            title: "Monto Enviado correctamente!!!",
            footer:
              '<a href="http://127.0.0.1:8000/api/amount">Revisar envios</a>',
          });
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 13%;
}
</style>
