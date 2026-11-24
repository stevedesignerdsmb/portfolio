import { resume } from '@/content/resume';

/**
 * The résumé as a document. Same markup in the pop-up, on /cv and in the PDF:
 * one column, real headings and lists, so ATS parsers and AI readers get
 * clean text in reading order.
 */
export function ResumeDoc({ id }: { id?: string }) {
  const r = resume;
  return (
    <article id={id} className="cv" itemScope itemType="https://schema.org/Person">
      <header className="cv-head">
        <div>
          <h1 itemProp="name">{r.name}</h1>
          <p className="cv-sub" itemProp="jobTitle">{r.headline}</p>
        </div>
        <p className="cv-contact">
          <span itemProp="address">{r.location}</span>
          <a href={`mailto:${r.email}`} itemProp="email">{r.email}</a>
          {r.links.map((l) => (
            <a key={l.href} href={l.href} itemProp="sameAs">{l.label}</a>
          ))}
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p itemProp="description">{r.summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {r.experience.map((e) => (
          <div key={e.company} className="cv-role">
            <h3>
              <span>
                {e.title}, {e.url ? <a href={e.url}>{e.company}</a> : e.company}
              </span>
              <span className="cv-date">{e.start} – {e.end}</span>
            </h3>
            <ul>
              {e.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        <ul className="cv-plain">
          {r.projects.map((p) => (
            <li key={p.name}>
              <a href={p.href} className="cv-strong">{p.name}</a>. {p.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <ul className="cv-plain">
          {r.skills.map((s) => (
            <li key={s.label}><span className="cv-strong">{s.label}:</span> {s.items}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <p>{r.languages}</p>
      </section>
    </article>
  );
}
