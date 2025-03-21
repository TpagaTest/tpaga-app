export type Login = {
    email: string;
    password: string;
};

export type Signup = {
    name: string;
    email: string;
    password: string;
};

export type Tokens = {
    accessToken: string;
    refreshToken: string;
}

export type User = {
    user: {
      id: number;
      name: string;
      email: string;
      createdAt: string;
    };
  } & Tokens;