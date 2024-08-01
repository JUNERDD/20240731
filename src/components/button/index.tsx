import { cn } from '@/lib/utils'
import { ElProps } from '@/types'
import { cva, VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { memo } from 'react'

const buttonVariants = cva(
  'flex-center h-10 gap-2 px-3 select-none transition duration-500 rounded-[3px] text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-[#0048D9]',
        line: 'bg-white border hover:bg-middle-gray'
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

interface IProps extends ElProps<'button'>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  Icon?: LucideIcon
  iconSize?: number
}

const Button: React.FC<IProps> = ({
  children,
  Icon,
  iconSize = 17,
  variant = 'primary',
  className,
  ...props
}) => {
  const icon = Icon && !children

  return (
    <button
      type="button"
      title="user"
      className={cn(buttonVariants({ variant, icon }), className)}
      {...props}
    >
      {Icon && <Icon strokeWidth={1} size={icon ? 20 : iconSize} />}
      {children}
    </button>
  )
}

export default memo(Button)
