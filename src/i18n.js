import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const apiKey = process.env.React_App_Localization_Api_Key;
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    ns: ['default'],
    defaultNS: 'default',

    supportedLngs: ['en', 'da'],

    backend: {
      loadPath,
    },
  });

// import i18next from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpBackend from 'i18next-http-backend';
// import ChainedBackend from 'i18next-chained-backend';
// import LocalStorageBackend from 'i18next-localstorage-backend';

// const apiKey = 'jxs-leiBPJqq6D-gZxhkBA';
// const version = 1; // change this to the version you want to use
// const loadPath = `https://cdn.i18nexus.com/versions/${version}/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next
//   .use(ChainedBackend)
//   .use(LanguageDetector)
//   .init({
//     fallbackLng: 'en', // set to your project's base language

//     ns: ['Registration'], // namespaces you want to load
//     defaultNS: 'default', // namespace that is your default

//     supportedLngs: ['en', 'da'], // languages available on this version

//     backend: {
//       backends: [LocalStorageBackend, HttpBackend],
//       backendOptions: [
//         {
//           defaultVersion: version,
//         },
//         {
//           loadPath,
//         },
//       ],
//     },
//   });
