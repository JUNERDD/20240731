import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type ElProps<T extends ElementType> = ComponentPropsWithoutRef<T>
