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
        line: 'border hover:bg-middle-gray'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

interface IProps extends ElProps<'button'>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  Icon?: LucideIcon
}

const Button: React.FC<IProps> = ({ children, Icon, variant = 'primary', className, ...props }) => {
  return (
    <button
      type="button"
      title="user"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon strokeWidth={1} size={17} />}
      {children}
    </button>
  )
}

export default memo(Button)
