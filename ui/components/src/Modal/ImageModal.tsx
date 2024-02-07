import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Skeleton } from '@fe3o3/ui'
import React, { useCallback, useState } from 'react'

import { ErrorInfo } from '~/Error'
import { BaseModal } from '~/Modal/hooks/useModal'
import Modal from '~/Modal/Modal'

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img<{ isLoading?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;

  ${({ isLoading }) =>
    isLoading
      ? css`
          display: none;
        `
      : css`
          display: inline;
        `}
`

export interface ImageModalProps extends BaseModal {
  src: string
  alt?: string
}

function ImageModal({ modalKey, src, alt }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  return (
    <Modal modalKey={modalKey} size="xl" title={alt} hideButtonContainer>
      {isLoading && (
        <Loader>
          <Skeleton width={450} height={450} />
        </Loader>
      )}
      {hasError ? (
        <ErrorInfo
          title="이미지를 불러오는 데 실패했습니다."
          message="존재하지 않는 이미지이거나 권한이 없습니다."
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          isLoading={isLoading}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
    </Modal>
  )
}

export default ImageModal
