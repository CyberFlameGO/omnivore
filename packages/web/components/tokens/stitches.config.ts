import type * as Stitches from '@stitches/react'
import { createStitches, createTheme } from '@stitches/react'
import {
  gray,
  grayDark,
  blackA,
  yellow,
  yellowDark,
  orange,
  orangeDark,
} from '@radix-ui/colors'

export enum ThemeId {
  Lighter = 'White',
  Light = 'LightGray',
  Dark = 'Gray',
  Darker = 'Dark',
}

export const { styled, css, theme, getCssText, globalCss, keyframes, config } =
  createStitches({
    utils: {
      bg: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
        backgroundColor: value,
      }),
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
        paddingTop: value,
      }),
      pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
        paddingLeft: value,
      }),
      pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
        paddingRight: value,
      }),
      px: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
        marginTop: value,
      }),
      mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
        marginLeft: value,
      }),
      mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
        marginRight: value,
      }),
      mx: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
    },
    theme: {
      fonts: {
        inter: 'Inter, sans-serif',
      },
      fontSizes: {
        1: '0.75em',
        2: '0.875em',
        3: '1em',
        4: '1.25em',
        5: '1.5em',
        6: '2em',
      },
      space: {
        1: '0.25em',
        2: '0.5em',
        3: '1em',
        4: '2em',
        5: '4em',
        6: '8em',
      },
      sizes: {
        1: '0.25em',
        2: '0.5em',
        3: '1em',
        4: '2em',
        5: '4em',
        6: '8em',
      },
      radii: {
        1: '0.125em',
        2: '0.25em',
        3: '0.5em',
        round: '9999px',
      },
      fontWeights: {},
      lineHeights: {},
      letterSpacings: {},
      borderWidths: {},
      borderStyles: {},
      shadows: {
        panelShadow: '0px 4px 18px rgba(120, 123, 134, 0.12)',
      },
      zIndices: {},
      transitions: {},
      colors: {
        // Radix Color Scales
        ...yellow, // Brand
        ...orange, //Accent

        // Grayscale
        grayBase: '#F8F8F8',
        grayBg: '#FFFFFF',
        grayBgActive: '#e6e6e6',
        grayBorder: 'rgba(0, 0, 0, 0.06)',
        grayTextContrast: '#3A3939',
        graySolid: '#9C9B9A',

        grayBgSubtle: gray.gray2,
        grayBgHover: gray.gray4,
        grayLine: gray.gray6,
        grayBorderHover: gray.gray8,
        graySolidHover: gray.gray10,
        grayText: gray.gray11,

        // Semantic Colors
        overlay: blackA.blackA9,
        highlightBackground: 'rgb(255,234,159)',
        highlight: '#FFD234',
        highlightText: 'rgba(255, 210, 52, 0.65)',
        error: '#FA5E4A',

        // Brand Colors
        omnivoreRed: '#FA5E4A;',
        omnivoreGray: '#3D3D3D',
        omnivoreOrange: '#FF9B3E',
        omnivorePeach: 'rgb(255, 212, 146)',
        omnivoreYellow: 'rgb(255, 234, 159)',
        omnivoreLightGray: 'rgb(125, 125, 125)',
        omnivoreCtaYellow: 'rgb(255, 210, 52)',

        // Reader Colors
        readerBg: '#E5E5E5',
        readerFont: '#3D3D3D',
        readerFontTransparent: 'rgba(61,61,61,0.65)',
        readerHeader: '3D3D3D',
        readerTableHeader: '#FFFFFF',
      },
    },
    media: {
      xsmDown: '(max-width: 375px)',
      smDown: '(max-width: 575px)',
      mdDown: '(max-width: 768px)',
      sm: '(min-width: 576px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 992px)',
      xl: '(min-width: 1200px)',
    }
  })

export const darkTheme = createTheme(ThemeId.Dark, {
  colors: {
    ...yellowDark, // Brand
    ...orangeDark, //Accent

    // Grayscale (top ones have been updated from new designs)
    grayBase: '#252525',
    grayBg: '#3B3938',
    grayBgActive: '#4f4d4c',
    grayTextContrast: '#D8D7D7',
    grayBorder: 'rgba(255, 255, 255, 0.06)',
    highlightText: '#867740',
    graySolid: '#9C9B9A',

    grayBgSubtle: grayDark.gray2,
    grayBgHover: grayDark.gray4,
    grayLine: grayDark.gray6,
    grayBorderHover: grayDark.gray8,
    graySolidHover: grayDark.gray10,
    grayText: grayDark.gray11,

    // Semantic Colors
    overlay: blackA.blackA9,
    highlightBackground: 'rgb(255,234,159)',
    highlight: '#FFD234',
    error: '#FA5E4A',

    // Reader Colors
    readerBg: '#303030',
    readerFont: '#b9b9b9',
    readerFontTransparent: 'rgba(185,185,185,0.65)',
    readerHeader: '#b9b9b9',
    readerTableHeader: '#FFFFFF',
  },
})

export const darkerTheme = createTheme(ThemeId.Darker, {
  colors: {
    ...yellowDark, // Brand
    ...orangeDark, //Accent

    // Grayscale
    grayBase: grayDark.gray1,
    grayBgSubtle: grayDark.gray2,
    grayBg: grayDark.gray3,
    grayBgHover: grayDark.gray4,
    grayBgActive: grayDark.gray5,
    grayLine: grayDark.gray6,
    grayBorder: grayDark.gray7,
    grayBorderHover: grayDark.gray8,
    graySolid: grayDark.gray9,
    graySolidHover: grayDark.gray10,
    grayText: grayDark.gray11,
    grayTextContrast: grayDark.gray12,

    // Semantic Colors
    overlay: blackA.blackA9,
    highlightBackground: 'rgb(255,234,159)',
    highlight: '#FFD234',
    highlightText: 'rgba(255, 210, 52)',
    error: '#FA5E4A',

    // Brand Colors
    loginBg: '#FFD492',

    // Reader Colors
    readerBg: '#000000',
    readerFont: '#888888',
    readerFontTransparent: 'rgba(136,136,136,0.65)',
    readerHeader: '#888888',
    readerTableHeader: '',
  },
})

export const lighterTheme = createTheme(ThemeId.Lighter, {
  colors: {
    ...yellow, // Brand
    ...orange, //Accent

    // Grayscale
    grayBase: '#F8F8F8',
    grayBgActive: '#FFFFFF',
    grayBorder: 'rgba(0, 0, 0, 0.06)',
    grayTextContrast: '#3A3939',

    // Grayscale
    grayBgSubtle: gray.gray2,
    grayBg: gray.gray3,
    grayBgHover: gray.gray4,
    grayLine: gray.gray6,
    grayBorderHover: gray.gray8,
    graySolid: gray.gray9,
    graySolidHover: gray.gray10,
    grayText: gray.gray11,

    // Semantic Colors
    overlay: blackA.blackA9,
    highlightBackground: 'rgb(255,234,159)',
    highlight: '#FFD234',
    error: '#FA5E4A',

    // Brand Colors
    loginBg: '#FFD492',

    // Reader Colors
    readerBg: '#E5DDD5',
    readerFont: '#3D3D3D',
    readerFontTransparent: 'rgba(61,61,61,0.65)',
    readerHeader: '',
    readerTableHeader: '',
  },
})

// Apply global styles in here
export const globalStyles = globalCss({
  '*': {
    '&:focus': {

      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  },
  // browser prefers this loaded here vs in the article styling css
  '.article-inner-css': {
    '::selection': {
      background: '$highlightText',
    }
  }
})
