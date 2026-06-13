'use client'

import { useEffect, useRef, useState } from 'react'

interface SitePreviewProps {
  url:        string
  hash:       string
  previewKey: number
  loading:    boolean
  onLoad:     () => void
  onRefresh:  () => void
}

const TARGET_WIDTH = 1280

export default function SitePreview({ url, hash, previewKey, loading, onLoad, onRefresh }: SitePreviewProps) {
  const iframeRef   = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale]               = useState(1)
  const [containerH, setContainerH]     = useState(600)

  // Measure container and compute scale
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale(width / TARGET_WIDTH)
      setContainerH(height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Scroll to hash after iframe loads
  const handleLoad = () => {
    if (hash) {
      setTimeout(() => {
        try {
          const el = iframeRef.current?.contentWindow?.document?.querySelector(hash)
          el?.scrollIntoView({ behavior: 'instant', block: 'start' })
        } catch { /* cross-origin guard */ }
      }, 150)
    }
    onLoad()
  }

  return (
    <div className="hidden xl:flex flex-col flex-1 min-w-0 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

      {/* Browser bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-gray-700" />
          <span className="w-3 h-3 rounded-full bg-gray-700" />
          <span className="w-3 h-3 rounded-full bg-gray-700" />
        </div>

        <div className="flex-1 bg-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono truncate border border-gray-700">
          {url || '…'}
        </div>

        <button
          onClick={onRefresh}
          title="Actualizar preview"
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white transition shrink-0"
        >
          <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>
            refresh
          </span>
        </button>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir en nueva pestaña"
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white transition shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        )}
      </div>

      {/* Scaled iframe container */}
      <div ref={containerRef} className="flex-1 relative bg-gray-950 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <span className="material-symbols-outlined text-[36px] animate-spin">progress_activity</span>
              <span className="text-sm">Cargando preview…</span>
            </div>
          </div>
        )}
        {url && (
          <iframe
            ref={iframeRef}
            key={previewKey}
            src={url}
            onLoad={handleLoad}
            style={{
              position:        'absolute',
              top:             0,
              left:            0,
              width:           `${TARGET_WIDTH}px`,
              height:          `${containerH / scale}px`,
              border:          'none',
              transform:       `scale(${scale})`,
              transformOrigin: '0 0',
            }}
          />
        )}
      </div>
    </div>
  )
}
