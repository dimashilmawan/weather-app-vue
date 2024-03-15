import { reactive } from "vue";

export const toggleStore = reactive({
  isCelsius: true,
  toggleTemp() {
    this.isCelsius = !this.isCelsius;
    localStorage.setItem("isCelsius", JSON.stringify(this.isCelsius));
  },
  loadToggleTemp(value) {
    this.isCelsius = value;
  },
});
