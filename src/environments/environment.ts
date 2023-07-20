// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appApiUrl: 'http://localhost:8000/api',
  keycloak: {
    url: 'https://login.mafc2.mil.my/auth/',
    realm: 'NCO',
    clientId: 'nco-lite-v2',
  },
  // keycloak: {
  //   url: 'http://localhost:8081/',
  //   realm: 'master',
  //   clientId: 'nco-lite',
  // },
  api: {
    uam: 'https://app.mafc2.mil.my/uam/v1/users',
    rms_asset: 'https://development-nco.mafc2.mil.my/api/rms-asset' 
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
