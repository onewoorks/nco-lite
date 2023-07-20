import { KeycloakService } from "keycloak-angular";
import { environment } from 'src/environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: environment.keycloak,
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