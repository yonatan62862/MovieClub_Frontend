class AppConfig {
  public BASE_API_URL = "http://localhost:3000";
  public POSTS_URL = `${this.BASE_API_URL}/posts`;
}

export const appConfig = new AppConfig();
