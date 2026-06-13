'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useEffect } from 'react'

interface TipTapEditorProps {
  content: string
  onChange: (html: string) => void
  disabled?: boolean
  placeholder?: string
}

const btnCls = (active: boolean) =>
  `p-1.5 rounded text-sm transition ${active ? 'bg-teal-500/20 text-teal-400' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`

export default function TipTapEditor({ content, onChange, disabled = false, placeholder = 'Escribe el contenido del artículo…' }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl max-w-full my-4' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-teal-400 underline' } }),
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // Sync external content changes (e.g. when editing loads data)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  useEffect(() => {
    editor?.setEditable(!disabled)
  }, [disabled, editor])

  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('URL de la imagen:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const setLink = () => {
    const prev = editor.getAttributes('link').href ?? ''
    const url  = window.prompt('URL del enlace:', prev)
    if (url === null) return
    if (url === '') { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className={`rounded-xl border border-gray-700 overflow-hidden ${disabled ? 'opacity-50' : ''}`}>
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-3 py-2 flex flex-wrap items-center gap-1">

        {/* Headings */}
        <button type="button" title="H1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={btnCls(editor.isActive('heading', { level: 1 }))}>
          <span className="font-bold text-xs">H1</span>
        </button>
        <button type="button" title="H2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnCls(editor.isActive('heading', { level: 2 }))}>
          <span className="font-bold text-xs">H2</span>
        </button>
        <button type="button" title="H3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnCls(editor.isActive('heading', { level: 3 }))}>
          <span className="font-bold text-xs">H3</span>
        </button>

        <div className="w-px h-5 bg-gray-600 mx-1" />

        {/* Inline */}
        <button type="button" title="Negrita"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnCls(editor.isActive('bold'))}>
          <span className="material-symbols-outlined text-[16px]">format_bold</span>
        </button>
        <button type="button" title="Cursiva"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnCls(editor.isActive('italic'))}>
          <span className="material-symbols-outlined text-[16px]">format_italic</span>
        </button>
        <button type="button" title="Código"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={btnCls(editor.isActive('code'))}>
          <span className="material-symbols-outlined text-[16px]">code</span>
        </button>
        <button type="button" title="Enlace" onClick={setLink}
          className={btnCls(editor.isActive('link'))}>
          <span className="material-symbols-outlined text-[16px]">link</span>
        </button>

        <div className="w-px h-5 bg-gray-600 mx-1" />

        {/* Blocks */}
        <button type="button" title="Lista con viñetas"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnCls(editor.isActive('bulletList'))}>
          <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
        </button>
        <button type="button" title="Lista numerada"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnCls(editor.isActive('orderedList'))}>
          <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
        </button>
        <button type="button" title="Cita"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnCls(editor.isActive('blockquote'))}>
          <span className="material-symbols-outlined text-[16px]">format_quote</span>
        </button>
        <button type="button" title="Imagen" onClick={addImage}
          className={btnCls(false)}>
          <span className="material-symbols-outlined text-[16px]">image</span>
        </button>

        <div className="w-px h-5 bg-gray-600 mx-1" />

        {/* History */}
        <button type="button" title="Deshacer"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white transition disabled:opacity-30">
          <span className="material-symbols-outlined text-[16px]">undo</span>
        </button>
        <button type="button" title="Rehacer"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white transition disabled:opacity-30">
          <span className="material-symbols-outlined text-[16px]">redo</span>
        </button>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="tiptap-content min-h-80 px-4 py-3 text-white text-sm bg-gray-800 focus-within:outline-none"
      />
    </div>
  )
}
