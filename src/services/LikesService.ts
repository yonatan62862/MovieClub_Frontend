import axios from "axios";
import { appConfig } from "../utils/AppConfig";

class LikesService {
  public async toggleLike(
    targetType: string = "Post",
    targetId: string,
    userId: string
  ) {
    const response = await axios.put(
      `${appConfig.BASE_API_URL}/likes/${targetType}/${targetId}/${userId}`
    );
    console.log(response.data);
  }
}

export const likesService = new LikesService();
