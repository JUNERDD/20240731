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
const navList: { text: string; path: string; Icon: LucideIcon }[] = [{ text: 'Organize', path: '/', Icon: LayoutGrid }]

const AppNav: React.FC<IProps> = () => {
  const pathname = usePathname()

  return (
    <nav className="flex-center-i h-full flex-col gap-1 bg-primary-deep py-2 text-white">
      <div className="border-b border-zinc-700 pb-2">
        <Link href="/" className="mx-4 flex h-10 w-10">
          <Logo />
        </Link>
      </div>

      {navList.map(({ text, path, Icon }) => (
        <Link
          key={text}
          href={path}
          className={cn(
            'flex-center-i scale-90 flex-col gap-1 rounded-[3px] p-2 text-xs hover:bg-[#143370]',
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
