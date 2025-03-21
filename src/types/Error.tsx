export type Error = {
    message: string;
    statusCode: string;
    error: string;
};

export type AuthContextType = { 
    user: any | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
  };
  