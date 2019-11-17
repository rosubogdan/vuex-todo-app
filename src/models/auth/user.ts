class User {
  constructor(
    public uid: string,
    public email: string,
    public password: string = '',
    public displayName: string = '') { }
}

export default User;
