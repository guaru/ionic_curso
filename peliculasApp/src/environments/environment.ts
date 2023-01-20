// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API:'https://api.themoviedb.org/3', // NO DEBE LLEVAR / AL FINAL
  API_KEY: 'dbedd208f65c520f3be8ef6cb99626c0',
  IMG_PATH: 'https://image.tmdb.org/t/p' // NO DEBE LLEVAR / AL FINAL
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
