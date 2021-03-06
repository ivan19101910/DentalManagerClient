// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'https://localhost:7115/',
  //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYmYiOjE2NDI4NzA2NDAsImV4cCI6MTY0MzQ3NTQ0MCwiaWF0IjoxNjQyODcwNjQwfQ.BeRf9Rmb-rCZWJoPZStu3UeOnPsLP9grVHNGERtKQc4',
  SERVICENAME_REGEX: /^[A-zА-яієїґІЄЇҐ0-9][A-zА-яієїґІЄЇҐ0-9\s-,']+$/,
  //ADDRESS_REGEX: /^[A-zА-яієїґІЄЇҐ0-9\s-,']+$/,
  NAME_REGEX: /^[А-яієїґІЄЇҐ\-']+$/,
  PHONENUMBER_REGEX: /^[0-9]+$/,
  PRICE_REGEX : /^[0-9]+$/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
