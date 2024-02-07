import { colors } from '@3o3/mystique-core'
import { css, Global } from '@emotion/react'

import { assetUtils } from '~/utils'

export const GlobalStyle = () => (
  <Global styles={[baseStyle, baseFont, viewerStyle]} />
)

const baseStyle = css`
  * {
    box-sizing: inherit;
  }
  body {
    background-color: ${colors.light.scheme.$gray10};
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Noto Sans KR';

    * {
      font-family: 'Noto Sans KR';
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: bolder;
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.17em;
    }

    h4 {
      font-size: 1em;
    }

    h5 {
      font-size: 0.83em;
    }

    h6 {
      font-size: 0.67em;
    }
  }
  html,
  body,
  #root {
    height: 100%;
    font-size: 100%;
  }
  a {
    text-decoration: none;
  }

  /* Chrome auto completed color prevent */
  input {
    font-family: 'Noto Sans KR';
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: black;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  textarea {
    font-family: 'Noto Sans KR';
  }
`

const baseFont = css`
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src:
      url(${assetUtils.getFontUrl('NotoSansKR-Regular', 'woff2')})
        format('woff2'),
      url(${assetUtils.getFontUrl('NotoSansKR-Regular', 'woff')}) format('woff'),
      url(${assetUtils.getFontUrl('NotoSansKR-Regular', 'otf')})
        format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src:
      url(${assetUtils.getFontUrl('NotoSansKR-Medium')}) format('woff2'),
      url(${assetUtils.getFontUrl('NotoSansKR-Medium', 'woff')}) format('woff'),
      url(${assetUtils.getFontUrl('NotoSansKR-Medium', 'otf')})
        format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src:
      url(${assetUtils.getFontUrl('NotoSansKR-Bold')}) format('woff2'),
      url(${assetUtils.getFontUrl('NotoSansKR-Bold', 'woff')}) format('woff'),
      url(${assetUtils.getFontUrl('NotoSansKR-Bold', 'otf')}) format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 800;
    src:
      url(${assetUtils.getFontUrl('NotoSansKR-Bold')}) format('woff2'),
      url(${assetUtils.getFontUrl('NotoSansKR-Bold', 'woff')}) format('woff'),
      url(${assetUtils.getFontUrl('NotoSansKR-Bold', 'otf')}) format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 900;
    src:
      url(${assetUtils.getFontUrl('NotoSansKR-Black')}) format('woff2'),
      url(${assetUtils.getFontUrl('NotoSansKR-Black', 'woff')}) format('woff'),
      url(${assetUtils.getFontUrl('NotoSansKR-Black', 'otf')})
        format('opentype');
    font-display: swap;
  }
`

const viewerStyle = css`
  .viewer-button {
    background-color: transparent;
    :hover {
      background-color: transparent;
    }
  }

  .viewer-toolbar > ul {
    .viewer-download {
      color: #fff;
      font-size: 0.75rem;
      line-height: 1.5rem;
      text-align: center;
      .viewer--download__icon {
        display: inline;
        width: 24px;
        height: 19px;
        filter: invert(100%) sepia(0%) saturate(7%) hue-rotate(198deg)
          brightness(101%) contrast(101%);
      }
    }

    > li {
      background-color: transparent;
    }
  }
`
