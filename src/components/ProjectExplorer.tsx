'use client'

import { useState } from 'react'

import { PORTFOLIO_PROJECTS } from '@/data/projects'

const points = [
  [95, 78], [151, 116], [226, 72], [305, 126], [388, 84], [482, 120], [566, 74], [649, 112],
  [72, 181], [174, 206], [266, 176], [348, 223], [444, 185], [538, 214], [625, 178], [700, 226],
  [112, 290], [207, 326], [295, 278], [381, 334], [476, 286], [575, 322], [670, 286], [735, 348],
  [76, 397], [171, 424], [258, 382], [350, 430], [451, 390], [548, 425], [639, 386], [708, 431],
] as const

const bars = [58, 86, 43, 104, 72, 126, 96, 145, 112, 164, 131, 151, 118, 139, 102, 124] as const

function ProjectVisual({ type }: { type: (typeof PORTFOLIO_PROJECTS)[number]['visual'] }) {
  if (type === 'market') return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <g className="visual-grid"><path d="M55 90H745M55 190H745M55 290H745M55 390H745" /></g>
      <path className="visual-trace" d="M55 353 C120 344 142 289 199 310 S294 218 356 250 455 122 516 176 603 98 745 120" />
      <path className="visual-trace visual-trace-muted" d="M55 330 C118 301 160 336 222 273 S329 316 392 214 496 257 549 185 643 220 745 152" />
      <g className="market-ticks">{bars.map((height, index) => <path key={index} d={`M${78 + index * 42} 410v-${height}`} />)}</g>
      <circle className="visual-pulse" cx="516" cy="176" r="5" />
    </svg>
  )

  if (type === 'poisson') return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <g className="poisson-points">{points.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index % 5 === 0 ? 4 : 2.3} />)}</g>
      <circle className="visual-orbit" cx="381" cy="334" r="76" />
      <circle className="visual-pulse" cx="381" cy="334" r="5" />
    </svg>
  )

  if (type === 'router') return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <g className="route-lines">
        <path d="M102 250C250 250 269 102 430 102S612 160 703 160" />
        <path d="M102 250C250 250 302 250 430 250S609 250 703 250" />
        <path d="M102 250C250 250 269 398 430 398S612 340 703 340" />
      </g>
      <g className="route-nodes"><circle cx="102" cy="250" r="13" /><circle cx="430" cy="102" r="9" /><circle cx="430" cy="250" r="9" /><circle cx="430" cy="398" r="9" /><circle cx="703" cy="160" r="13" /><circle cx="703" cy="250" r="13" /><circle cx="703" cy="340" r="13" /></g>
    </svg>
  )

  if (type === 'audio') return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <path className="audio-line" d="M45 250 C75 250 76 184 102 184 S132 330 163 330 188 104 221 104 252 382 283 382 314 161 344 161 378 308 407 308 436 205 466 205 500 279 528 279 561 226 589 226 620 262 651 262 677 242 706 242 727 250 755 250" />
      <path className="audio-shadow" d="M45 250 C75 250 76 214 102 214 S132 300 163 300 188 154 221 154 252 346 283 346 314 191 344 191 378 288 407 288 436 220 466 220 500 267 528 267 561 235 589 235 620 257 651 257 677 246 706 246 727 250 755 250" />
    </svg>
  )

  if (type === 'palette') return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <g className="document-lines"><path d="M156 76H523V420H156Z" /><path d="M206 145H440M206 188H473M206 231H416M206 316H457M206 359H390" /></g>
      <path className="palette-focus" d="M188 260H613V337H188Z" />
      <path className="palette-cursor" d="m579 294 28 11-13 6-6 14Z" />
    </svg>
  )

  if (type === 'flowtime') return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <circle className="timer-track" cx="310" cy="250" r="142" />
      <circle className="timer-progress" cx="310" cy="250" r="142" />
      <path className="timer-hand" d="M310 250V151" />
      <g className="session-bars">{bars.slice(0, 10).map((height, index) => <path key={index} d={`M520 ${365 - height}v${height}`} transform={`translate(${index * 22})`} />)}</g>
    </svg>
  )

  return (
    <svg viewBox="0 0 800 500" aria-hidden="true">
      <g className="map-lines"><path d="M78 101C209 168 277 82 374 147s180 48 346-32" /><path d="M48 323c119-77 189-53 284 28s221 45 414-36" /><path d="M166 46c53 116 34 218-42 391M456 44c-77 118-59 250 44 409M667 53c-55 96-48 188 26 276" /></g>
      <g className="map-pins"><circle cx="210" cy="183" r="8" /><circle cx="434" cy="296" r="8" /><circle cx="635" cy="151" r="8" /></g>
      <path className="map-route" d="M210 183C326 137 355 334 434 296s110-118 201-145" />
    </svg>
  )
}

export default function ProjectExplorer() {
  const [active, setActive] = useState(0)

  return (
    <div className="work-layout">
      <div className="project-list">
        {PORTFOLIO_PROJECTS.map((project, index) => {
          const content = <>
            <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <strong>{project.name}</strong>
              <small>{project.label}</small>
            </span>
            {project.href ? <svg className="project-mark" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M7 4h7v7" /></svg> : null}
            <span className="sr-only">{project.detail} {project.proof}</span>
          </>

          return project.href ? (
            <a className={`project-link ${active === index ? 'is-active' : ''}`} href={project.href} target="_blank" rel="noreferrer" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} key={project.name}>{content}</a>
          ) : (
            <button className={`project-link ${active === index ? 'is-active' : ''}`} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} key={project.name}>{content}</button>
          )
        })}
      </div>

      <div className="work-preview">
        <div className="visual-stage" aria-hidden="true">
          {PORTFOLIO_PROJECTS.map((project, index) => <div className={`project-visual ${active === index ? 'is-active' : ''}`} key={project.name}><ProjectVisual type={project.visual} /></div>)}
        </div>
        <p className="preview-detail" aria-live="polite">
          <span>{PORTFOLIO_PROJECTS[active].detail}</span>
          <strong>{PORTFOLIO_PROJECTS[active].proof}</strong>
        </p>
      </div>
    </div>
  )
}
