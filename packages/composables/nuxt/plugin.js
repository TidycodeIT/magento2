import { integrationPlugin } from '@vue-storefront/magento';
import { 
  loadState
} from '@vue-storefront/magento/nuxt/helpers';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export default integrationPlugin(({ app, integration }) => {
  const settings = {
    api: 'https://demo-magento2.storefrontcloud.io/graphql',
    websites: {
      base: {
        code: 'base',
        defaultStoreGroup: 'main_website_store',
        storeGroups: {
          // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
          main_website_store: {
            code: 'main_website_store',
            defaultStore: 'default',
            stores: {
              default: {
                code: 'default'
              },
              ru: {
                code: 'ru'
              },
              en: {
                code: 'us'
              }
            }
          }
        }
      }
    },
    defaultStore: 'default'
  };

  
  const state = loadState(app, settings);

  integration.configure({ ...moduleOptions, ...settings, state });
});
