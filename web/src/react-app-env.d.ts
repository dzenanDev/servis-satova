/// <reference types="react-scripts" />
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  less: {
    modifyVars: (arg: any) => Promise<any>;
  };
  REACT_APP_API_URL: any;
}
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.graphql' {
  const content: any;
  export = content;
}
declare module '*.png' {
  const value: any;
  export = value;
}
declare module '*.md' {
  const content: string;
  export = content;
}
