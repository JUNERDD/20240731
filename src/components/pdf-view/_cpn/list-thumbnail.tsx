import { RotateCw } from 'lucide-react'
import { memo } from 'react'
import { Thumbnail, ThumbnailProps } from 'react-pdf'

export interface ListThumbnailProps extends ThumbnailProps {
  onRotate?: () => void
}

const ListThumbnail: React.FC<ListThumbnailProps> = ({ pageNumber, rotate, onRotate }) => {
  /**
   * 旋转pdf
   */
  function rotatePDF() {
    onRotate && onRotate()
  }

  return (
    <Thumbnail
      pageNumber={pageNumber}
      width={120}
      rotate={rotate}
      className="relative cursor-default"
    >
      {/* 旋转按钮 */}
      <div className="absolute flex-center top-0 right-0 left-0 bottom-0">
        <div
          className="bg-white w-8 h-8 border border-primary rounded-full flex-center group-hover/item:bg-primary group-hover/item:border-none shadow-2xl drop-shadow-md cursor-pointer"
          title="Rotate"
          onClick={rotatePDF}
        >
          <RotateCw size={14} className="stroke-primary group-hover/item:stroke-white" />
        </div>
      </div>
    </Thumbnail>
  )
}

export default memo(ListThumbnail)
