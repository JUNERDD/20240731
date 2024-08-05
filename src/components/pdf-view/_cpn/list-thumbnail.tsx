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
    <Thumbnail pageNumber={pageNumber} width={120} rotate={rotate} className="relative cursor-default overflow-auto">
      {/* 旋转按钮 */}
      <div className="flex-center absolute bottom-0 left-0 right-0 top-0">
        <div
          className="flex-center h-8 w-8 cursor-pointer rounded-full border border-primary bg-white shadow-2xl drop-shadow-md group-hover/item:border-none group-hover/item:bg-primary"
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
