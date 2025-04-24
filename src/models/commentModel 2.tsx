export interface Comment {
    _id: string;
    user: { _id: string; username: string; profileImage: string };
    text: string;
    createdAt: string;
  }