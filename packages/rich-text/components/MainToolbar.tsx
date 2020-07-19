// https://fontawesome.com/icons?c=editors
import {
  faBold,
  faCode,
  faHeading,
  faIndent,
  faItalic,
  faListOl,
  faListUl,
  faOutdent,
  faParagraph,
  faQuoteLeft,
  faRedo,
  faRemoveFormat,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  isBlockActive,
  isMarkActive,
  isWrapped,
  removeFormatting,
  setListTypeOrWrapInList,
  toggleWrap,
} from '@pompom/commands'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  ToolbarItemSpec,
} from '@pompom/react'
import { lift, setBlockType, toggleMark } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { MarkType, Schema } from 'prosemirror-model'
import { liftListItem, sinkListItem, wrapInList } from 'prosemirror-schema-list'
import React from 'react'

import { EditorSchema, schema } from '../schema'

const toggleMarkItem = <S extends Schema>(
  markType: MarkType<S>,
  title: string
): ToolbarItemSpec<S> => ({
  title,
  active: isMarkActive(markType),
  enable: toggleMark(markType),
  run: toggleMark(markType),
})

export const format = {
  strong: toggleMarkItem(schema.marks.strong, 'Toggle strong'),
  emphasis: toggleMarkItem(schema.marks.em, 'Toggle emphasis'),
  code: toggleMarkItem(schema.marks.code, 'Toggle code'),
  subscript: toggleMarkItem(schema.marks.subscript, 'Toggle subscript'),
  superscript: toggleMarkItem(schema.marks.superscript, 'Toggle superscript'),
  underline: toggleMarkItem(schema.marks.underline, 'Toggle underline'),
  strikethrough: toggleMarkItem(
    schema.marks.strikethrough,
    'Toggle strike-through'
  ),
  removeFormat: {
    title: 'Remove formatting',
    run: removeFormatting,
    enable: removeFormatting,
  },
}

const block = {
  paragraph: {
    title: 'Change to paragraph',
    active: isBlockActive(schema.nodes.paragraph),
    enable: setBlockType(schema.nodes.paragraph),
    run: setBlockType(schema.nodes.paragraph),
  },
  code: {
    title: 'Change to code block',
    active: isBlockActive(schema.nodes.code_block),
    enable: setBlockType(schema.nodes.code_block),
    run: setBlockType(schema.nodes.code_block),
  },
  heading: {
    title: 'Change to heading',
    active: isBlockActive(schema.nodes.heading, { level: 1 }),
    enable: setBlockType(schema.nodes.heading, { level: 1 }),
    run: setBlockType(schema.nodes.heading, { level: 1 }),
  },
}

const wrap = {
  blockquote: {
    title: 'Wrap in block quote',
    active: isWrapped(schema.nodes.blockquote),
    enable: toggleWrap(schema.nodes.blockquote),
    run: toggleWrap(schema.nodes.blockquote),
  },
  ordered_list: {
    title: 'Wrap in ordered list',
    active: isBlockActive(schema.nodes.list, { type: 'ordered' }),
    enable: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
    run: setListTypeOrWrapInList(schema.nodes.list, { type: 'ordered' }),
  },
  unordered_list: {
    title: 'Wrap in unordered list',
    active: isBlockActive(schema.nodes.list, { type: 'unordered' }),
    enable: setListTypeOrWrapInList(schema.nodes.list, { type: 'unordered' }),
    run: setListTypeOrWrapInList(schema.nodes.list, { type: 'unordered' }),
  },
  lift: {
    title: 'Outdent',
    enable: liftListItem(schema.nodes.list),
    run: liftListItem(schema.nodes.list),
  },
  sink: {
    title: 'Indent',
    enable: sinkListItem(schema.nodes.list),
    run: sinkListItem(schema.nodes.list),
  },
}

const history = {
  undo: {
    title: 'Undo last change',
    enable: undo,
    run: undo,
  },
  redo: {
    title: 'Redo last change',
    enable: redo,
    run: redo,
  },
}

export const MainToolbar: React.FC = () => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem<EditorSchema> item={format.strong}>
          <FontAwesomeIcon icon={faBold} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.emphasis}>
          <FontAwesomeIcon icon={faItalic} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.code}>
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.subscript}>
          <FontAwesomeIcon icon={faSubscript} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.superscript}>
          <FontAwesomeIcon icon={faSuperscript} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.underline}>
          <FontAwesomeIcon icon={faUnderline} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.strikethrough}>
          <FontAwesomeIcon icon={faStrikethrough} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={format.removeFormat}>
          <FontAwesomeIcon icon={faRemoveFormat} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem<EditorSchema> item={block.paragraph}>
          <FontAwesomeIcon icon={faParagraph} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={block.code}>
          <FontAwesomeIcon icon={faCode} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={block.heading}>
          <FontAwesomeIcon icon={faHeading} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem<EditorSchema> item={wrap.blockquote}>
          <FontAwesomeIcon icon={faQuoteLeft} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem<EditorSchema> item={wrap.ordered_list}>
          <FontAwesomeIcon icon={faListOl} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={wrap.unordered_list}>
          <FontAwesomeIcon icon={faListUl} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={wrap.lift}>
          <FontAwesomeIcon icon={faOutdent} />
        </ToolbarItem>
        <ToolbarItem<EditorSchema> item={wrap.sink}>
          <FontAwesomeIcon icon={faIndent} />
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarItem item={history.undo}>
          <FontAwesomeIcon icon={faUndo} />
        </ToolbarItem>
        <ToolbarItem item={history.redo}>
          <FontAwesomeIcon icon={faRedo} />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  )
}
