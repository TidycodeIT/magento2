import { FetchResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import { GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables } from '@vue-storefront/magento-types';
import { GraphQLError } from 'graphql';
import gql from 'graphql-tag';
import recaptchaValidator from '../../helpers/recaptcha/recaptchaValidator';
import generateCustomerToken from './generateCustomerToken';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Logs in the customer based on provided username and password. To override the default query, use the `generateCustomerToken` query key.
 */
export default async (
  context: Context,
  params: {
    email: string;
    password: string;
    recaptchaToken: string;
  },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<GenerateCustomerTokenMutation>> => {
  try {
    if (context.config.recaptcha.isEnabled) {
      /**
       * recaptcha token verification
       */
      const response = await recaptchaValidator(context, params.recaptchaToken);

      if (!response.success) {
        return {
          errors: [new GraphQLError('Error during reCaptcha verification. Please try again.')],
          data: null,
        };
      }
    }

    return await context.client.mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>(
      {
        mutation: gql`${generateCustomerToken}`,
        variables: {
          email: params.email,
          password: params.password,
        },
        context: {
          headers: getHeaders(context, customHeaders),
        },
      },
    );
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null,
      };
    }
    throw error.networkError?.result || error;
  }
};
