import { Flex, Icon, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'

interface Props {
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

export default function InfiniteScrollBottom({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: Props) {
  return (
    <>
      {isFetchingNextPage && (
        <Flex
          justifyContent="center"
          alignItems="center"
          css={css`
            padding: 20px;
          `}
        >
          <Icon
            color={colors.light.scheme.$gray40}
            icon="ic_basic_fill_info"
            size={20}
          />
          &nbsp;
          <Text
            typography="body16"
            weight="regular"
            css={css`
              color: ${colors.light.scheme.$gray40};
            `}
          >
            다음 페이지를 불러오는 중입니다.
          </Text>
        </Flex>
      )}
      {hasNextPage ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          css={css`
            padding: 20px;
          `}
        >
          <Button
            variant="lineBlue"
            size="small"
            onClick={() => fetchNextPage()}
          >
            더보기
          </Button>
        </Flex>
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          css={css`
            padding: 20px;
          `}
        >
          <Icon
            color={colors.light.scheme.$gray40}
            icon="ic_basic_fill_info"
            size={20}
          />
          &nbsp;
          <Text
            typography="body16"
            weight="regular"
            color={colors.light.scheme.$gray40}
          >
            더 이상 데이터가 없습니다.
          </Text>
        </Flex>
      )}
    </>
  )
}
