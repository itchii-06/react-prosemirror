import { EditorConfig } from '@pompom/core'
import { Schema } from 'prosemirror-model'
import React, { PropsWithChildren, ReactElement } from 'react'

import { EditorProvider } from './EditorProvider'

export interface EditorFieldProps<T> {
  onChange: (value: T) => void
  value?: T
}

export const PomPom = <S extends Schema, T>({
  children,
  config,
  onChange,
  value,
}: PropsWithChildren<
  EditorFieldProps<T> & {
    config: EditorConfig<S, T>
  }
>): ReactElement => {
  return (
    <EditorProvider config={config} handleChange={onChange} value={value}>
      {children}
    </EditorProvider>
  )
}