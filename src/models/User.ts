export class User {
  readonly _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshTokens?: string[];
  profilePicture?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    _id?: string,
    refreshTokens?: string[],
    profilePicture?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this._id = _id;
    this.email = email;
    this.password = password;
    this.refreshTokens = refreshTokens || [];
    this.profilePicture = profilePicture;
  }
}
