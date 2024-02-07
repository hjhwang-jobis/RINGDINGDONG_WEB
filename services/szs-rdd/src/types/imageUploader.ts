import { FileByteSize, FileType } from '~/constants'

export interface ImageUploaderConfig {
  imageDimensions: ImageDimensions
  imageRatioRange?: ImageRatioRange
  fileTypes: FileType[]
  fileByteSize: FileByteSize
}

export interface FileDescription {
  name: string
  url: string
}

export interface ImageDescription {
  id: string
  url: string
  name: string
}

export type ImageDimensions = {
  min: {
    width: number
    height: number
  }
  max: {
    width: number
    height: number
  }
}

export type ImageRatioRange = {
  min: {
    width: number
    height: number
  }
  max: {
    width: number
    height: number
  }
}
