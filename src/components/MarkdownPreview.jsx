import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import mermaid from 'mermaid'

export default function MarkdownPreview({ value }) {
  useEffect(() => {
    // init mermaid
    mermaid.initialize({ startOnLoad: false })
    // Render mermaid diagrams after mount
    const elements = document.querySelectorAll('.language-mermaid')
    elements.forEach((el, idx) => {
      const code = el.textContent
      const targetId = `mermaid-${idx}`
      const wrapper = document.createElement('div')
      wrapper.id = targetId
      el.parentNode.replaceWith(wrapper)
      try {
        mermaid.render(targetId, code, (svgCode) => {
          wrapper.innerHTML = svgCode
        })
      } catch (e) {
        wrapper.innerText = 'Mermaid render error: ' + e.message
      }
    })
  }, [value])

  return (
    <div style={{border: '1px solid #ddd', padding: 12, borderRadius: 6}}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} children={value || ''} />
    </div>
  )
}
