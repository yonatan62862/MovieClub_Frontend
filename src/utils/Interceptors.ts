import axios from "axios";

class Interceptors {
  public listen(): void {
    axios.interceptors.request.use((request) => {
      request.headers.Authorization =
        "Bearer " + sessionStorage.getItem("token");
      return request;
    });
  }
}
export const interceptors = new Interceptors();
