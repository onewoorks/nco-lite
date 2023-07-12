import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8081/',
          realm: 'master',
          clientId: 'nco-lite',
        },
        // loadUserProfileAtStartUp: true,
        initOptions: {
          onLoad: 'login-required',
          // silentCheckSsoRedirectUri:
          //   window.location.origin + '/assets/silent-check-sso.html'
        },
        // bearerExcludedUrls: []
        shouldAddToken: (request) => {
          const { method, url } = request;
      
          const isGetRequest = 'GET' === method.toUpperCase();
          const acceptablePaths = ['/assets', '/inventory/aircraft'];
          const isAcceptablePathMatch = acceptablePaths.some((path) =>
            url.includes(path)
          );
      
          return !(isGetRequest && isAcceptablePathMatch);
        }
      });
}