import { ArticleAttributes } from '../../../lib/networking/queries/useGetArticleQuery'
import { Article } from './../../../components/templates/article/Article'
import { Box, VStack } from './../../elements/LayoutPrimitives'
import { StyledText } from './../../elements/StyledText'
import { ArticleSubtitle } from './../../patterns/ArticleSubtitle'
import { theme, ThemeId } from './../../tokens/stitches.config'
import { HighlightsLayer } from '../../templates/article/HighlightsLayer'
import { Button } from '../../elements/Button'
import { useState, useEffect, MutableRefObject } from 'react'
import { ReportIssuesModal } from './ReportIssuesModal'
import { reportIssueMutation } from '../../../lib/networking/mutations/reportIssueMutation'
import { ArticleHeaderToolbar } from './ArticleHeaderToolbar'
import Head from 'next/head'
import { articleKeyboardCommands } from '../../../lib/keyboardShortcuts/navigationShortcuts'
import { useKeyboardShortcuts } from '../../../lib/keyboardShortcuts/useKeyboardShortcuts'
import { ShareArticleModal } from './ShareArticleModal'
import { userPersonalizationMutation } from '../../../lib/networking/mutations/userPersonalizationMutation'
import { webBaseURL } from '../../../lib/appConfig'
import { updateThemeLocally } from '../../../lib/themeUpdater'

type ArticleContainerProps = {
  viewerUsername: string
  article: ArticleAttributes
  scrollElementRef: MutableRefObject<HTMLDivElement | null>
  isAppleAppEmbed: boolean
  highlightBarDisabled: boolean
  highlightsBaseURL: string
  margin?: number
  fontSize?: number
  fontFamily?: string
}

export function ArticleContainer(props: ArticleContainerProps): JSX.Element {
  const [showShareModal, setShowShareModal] = useState(false)
  const [showNotesSidebar, setShowNotesSidebar] = useState(false)
  const [showReportIssuesModal, setShowReportIssuesModal] = useState(false)
  const [fontSize, setFontSize] = useState(props.fontSize ?? 20)

  const updateFontSize = (newFontSize: number) => {
    setFontSize(newFontSize)
    userPersonalizationMutation({ fontSize: newFontSize })
  }

  useKeyboardShortcuts(
    articleKeyboardCommands((action) => {
      switch (action) {
        case 'openOriginalArticle':
          const url = props.article.url
          if (url) {
            window.open(url, '_blank')
          }
          break
        case 'incrementFontSize':
          updateFontSize(Math.min(fontSize + 2, 28))
          break
        case 'decrementFontSize':
          updateFontSize(Math.max(fontSize - 2, 10))
          break
      }
    })
  )

  // Listen for font size and color mode change events sent from host apps (ios, macos...)
  useEffect(() => {
    const increaseFontSize = () => {
      setFontSize(Math.min(fontSize + 2, 28))
    }

    const decreaseFontSize = () => {
      setFontSize(Math.max(fontSize - 2, 10))
    }

    const switchToDarkMode = () => {
      updateThemeLocally(ThemeId.Dark)
    }

    const switchToLightMode = () => {
      updateThemeLocally(ThemeId.Light)
    }

    document.addEventListener('increaseFontSize', increaseFontSize)
    document.addEventListener('decreaseFontSize', decreaseFontSize)
    document.addEventListener('switchToDarkMode', switchToDarkMode)
    document.addEventListener('switchToLightMode', switchToLightMode)

    return () => {
      document.removeEventListener('increaseFontSize', increaseFontSize)
      document.removeEventListener('decreaseFontSize', decreaseFontSize)
      document.removeEventListener('switchToDarkMode', switchToDarkMode)
      document.removeEventListener('switchToLightMode', switchToLightMode)
    }
  })

  useEffect(() => {
    window.analytics?.track('link_read', {
      link: props.article.id,
      slug: props.article.slug,
      url: props.article.originalArticleUrl,
    })
  }, [props.article])

  const styles = {
    margin: props.margin ?? 140,
    fontSize,
    fontFamily: props.fontFamily ?? 'inter',
    readerFontColor: theme.colors.readerFont.toString(),
    readerFontColorTransparent: theme.colors.readerFontTransparent.toString(),
    readerTableHeaderColor: theme.colors.readerTableHeader.toString(),
    readerHeadersColor: theme.colors.readerHeader.toString(),
  }

  return (
    <>
      <Head>
        <script async src="/static/scripts/mathJaxConfiguration.js" />
        <script
          async
          id="MathJax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </Head>
      <Box
        id="article-container"
        css={{
          padding: '16px',
          maxWidth: '94%',
          '--text-font-family': styles.fontFamily,
          '--text-font-size': `${styles.fontSize}px`,
          '--line-height': `1.61em`,
          '--blockquote-padding': '0.5em 1em',
          '--blockquote-icon-font-size': '1.3rem',
          '--figure-margin': '1.6rem auto',
          '--hr-margin': '1em',
          '--font-color': styles.readerFontColor,
          '--font-color-transparent': styles.readerFontColorTransparent,
          '--table-header-color': styles.readerTableHeaderColor,
          '--headers-color': styles.readerHeadersColor,
          '@sm': {
            '--blockquote-padding': '1em 2em',
            '--blockquote-icon-font-size': '1.7rem',
            '--figure-margin': '2.6875rem auto',
            '--hr-margin': '2em',
            margin: `30px ${styles.margin / 2}px`,
          },
          '@md': {
            maxWidth: '92%',
          },
          '@lg': {
            margin: `30px 0`,
            width: 'auto',
            maxWidth: 1024 - styles.margin,
          },
        }}
      >
        <VStack alignment="start" distribution="start">
          <StyledText
            style="boldHeadline"
            css={{ fontFamily: styles.fontFamily }}
          >
            {props.article.title}
          </StyledText>
          <ArticleSubtitle
            rawDisplayDate={
              props.article.publishedAt ?? props.article.createdAt
            }
            author={props.article.author}
            href={props.article.url}
          />
          <ArticleHeaderToolbar
            articleTitle={props.article.title}
            articleShareURL={props.highlightsBaseURL}
            setShowNotesSidebar={setShowNotesSidebar}
            setShowShareArticleModal={setShowShareModal}
            hasHighlights={props.article.highlights?.length > 0}
          />
        </VStack>
        <Article
          articleId={props.article.id}
          content={props.article.content}
          initialAnchorIndex={props.article.readingProgressAnchorIndex}
          scrollElementRef={props.scrollElementRef}
        />
        <Button
          style="ghost"
          css={{
            p: 0,
            my: '$4',
            color: '$error',
            fontSize: '$1',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          onClick={() => setShowReportIssuesModal(true)}
        >
          Report issues with this page -{'>'}
        </Button>
        <Box css={{ height: '100px' }} />
      </Box>
      <HighlightsLayer
        viewerUsername={props.viewerUsername}
        highlights={props.article.highlights}
        articleTitle={props.article.title}
        articleAuthor={props.article.author ?? ''}
        articleId={props.article.id}
        isAppleAppEmbed={props.isAppleAppEmbed}
        highlightBarDisabled={props.highlightBarDisabled}
        showNotesSidebar={showNotesSidebar}
        highlightsBaseURL={props.highlightsBaseURL}
        setShowNotesSidebar={setShowNotesSidebar}
      />
      {showReportIssuesModal ? (
        <ReportIssuesModal
          onCommit={(comment: string) => {
            reportIssueMutation({
              pageId: props.article.id,
              itemUrl: props.article.url,
              reportTypes: ['CONTENT_DISPLAY'],
              reportComment: comment,
            })
          }}
          onOpenChange={(open: boolean) => setShowReportIssuesModal(open)}
        />
      ) : null}
      {showShareModal && (
        <ShareArticleModal
          url={`${webBaseURL}/${props.viewerUsername}/${props.article.slug}/highlights?r=true`}
          title={props.article.title}
          imageURL={props.article.image}
          author={props.article.author}
          publishedAt={props.article.publishedAt ?? props.article.createdAt}
          description={props.article.description}
          originalArticleUrl={props.article.originalArticleUrl}
          onOpenChange={(open: boolean) => setShowShareModal(open)}
        />
      )}
    </>
  )
}
