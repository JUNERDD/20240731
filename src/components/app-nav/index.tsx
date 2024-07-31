'use client'

import Logo from '@/assets/svg/logo'
import { cn } from '@/lib/utils'
import { LayoutGrid, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

interface IProps {}

/**
 * 导航
 */
const navList: { text: string; path: string; Icon: LucideIcon }[] = [
  { text: 'Organize', path: '/', Icon: LayoutGrid }
]

const AppNav: React.FC<IProps> = () => {
  const pathname = usePathname()

  return (
    <nav className="h-full py-2 flex-center-i flex-col gap-1 bg-primary-deep text-white">
      <div className="pb-2 border-b border-zinc-700">
        <Link href="/" className="w-10 h-10 flex mx-4 ">
          <Logo />
        </Link>
      </div>

      {navList.map(({ text, path, Icon }) => (
        <Link
          key={text}
          href={path}
          className={cn(
            'flex-center-i flex-col text-xs gap-1 p-2 hover:bg-[#143370] rounded-[3px] scale-90',
            pathname === path ? 'bg-[#294C94]' : 'bg-text-zinc-400'
          )}
        >
          <Icon />
          <span>{text}</span>
        </Link>
      ))}
    </nav>
  )
}

export default memo(AppNav)
