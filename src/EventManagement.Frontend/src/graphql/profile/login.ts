import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser($input: LoginUserInput!) {
        login(input: $input) {
            token
        }
    }
`;

export type LoginUserMutation = {
  login: {
    token: string;
  }
};

export type LoginUserMutationVariables = {
  input: {
    email: string;
    password: string;
  }
};
