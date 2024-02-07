declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >
  const src: string
  export default src
}

declare module '*.jpg' {
  const content
  export default content
}

declare module '*.png' {
  const content
  export default content
}
