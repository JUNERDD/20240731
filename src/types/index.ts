import type { ChangeEvent, ChangeEventHandler, ComponentProps, ElementType, MouseEventHandler } from 'react'

export type ElProps<T extends ElementType> = ComponentProps<T>

export type ElChange<T extends Element> = ChangeEventHandler<T>

export type ElEvent<T extends Element> = ChangeEvent<T>

export type ElMouse<T extends Element> = MouseEventHandler<T>
