export interface Post {
    _id: string;
    user: { _id: string; username: string; profileImage: string };
    text: string;
    image?: string;
    likes: string[];
    createdAt: string;
    commentsCount?: number;
  }