import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { Fragment, memo } from 'react'

const buttonVariants = cva(
  'flex-center gap-2 px-3 h-full border-y border-r border-middle-gray hover:bg-middle-gray transition duration-500',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-[#0048D9] border-y-0',
        line: 'bg-white hover:bg-middle-gray'
      },
      icon: {
        true: 'p-0 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

export interface ButtonGroupPropsItems {
  key: string
  Icon?: LucideIcon
  label?: React.ReactNode
  title?: string
  iconSize?: number
  render?: () => React.ReactNode
}

interface IProps extends VariantProps<typeof buttonVariants> {
  items: ButtonGroupPropsItems[]
  Icon?: LucideIcon
  disabled?: boolean
  className?: string
  buttonClassName?: string
  icon?: boolean
  onClick?: (key: string) => void
}

const ButtonGroup: React.FC<IProps> = ({
  items,
  onClick,
  disabled,
  className,
  buttonClassName,
  icon,
  variant = 'primary',
  ...props
}) => {
  /**
   * 选中
   */
  const handleClick = (key: string) => {
    onClick && onClick(key)
  }

  return (
    <div
      title="user"
      className={cn('flex-center-i relative h-10 select-none overflow-hidden rounded-[3px] text-sm', className)}
      {...props}
    >
      {items.map(({ Icon, label, key, title, render, iconSize = 17 }, index) => {
        return (
          <Fragment key={key}>
            {render ? (
              render()
            ) : (
              <button
                type="button"
                className={cn(
                  index === 0 && 'rounded-l-[3px] border-l',
                  index === items.length - 1 && 'rounded-r-[3px]',
                  buttonVariants({ variant, icon }),
                  variant === 'primary' && index === 0 && 'border-l-0',
                  variant === 'primary' && index === items.length - 1 && 'border-r-0',
                  buttonClassName
                )}
                title={title}
                onClick={() => handleClick(key)}
              >
                {Icon && <Icon strokeWidth={1} size={icon ? 20 : iconSize} />}
                {label}
              </button>
            )}
          </Fragment>
        )
      })}

      {/* 禁用时遮罩层 */}
      {disabled && <div className="absolute flex h-full w-full cursor-not-allowed bg-[rgba(255,255,255,0.5)]" />}
    </div>
  )
}

export default memo(ButtonGroup)
