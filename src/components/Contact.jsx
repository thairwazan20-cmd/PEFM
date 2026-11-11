import { useState } from 'react';
import { Icon } from './Icon';
import { SectionHead } from './UI';
import { PHONES, EMAILS, ADDRESS, MAP_SRC, INTERESTS, COTIZACION, waLink } from '../data';

function Field({ label, as = 'input', ...props }) {
  const Tag = as;
  return (
    <label className={`field${as === 'textarea' ? ' field--area' : ''}`}>
      <Tag placeholder=" " {...props} />
      <span>{label}</span>
    </label>
  );
}

export default function Contact() {
  const [interes, setInteres] = useState(INTERESTS[0]);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      'Hola PEFM, quisiera una cotización.',
      `*Nombre:* ${f.get('nombre')}`,
      f.get('empresa') ? `*Empresa:* ${f.get('empresa')}` : '',
      `*Teléfono:* ${f.get('telefono')}`,
      `*Interés:* ${interes}`,
      `*Mensaje:* ${f.get('mensaje')}`,
    ].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
  };

  return (
    <section className="section contact" id="contacto">
      <div className="container">
        <SectionHead
          eyebrow="Contacto"
          title={<>Hablemos de tu <em>proyecto</em></>}
          text="Cuéntanos qué necesitas y te enviamos una cotización sin compromiso."
        />

        <div className="contact__grid">
          <aside className="cinfo reveal reveal--left">
            <h3>Información de contacto</h3>
            <p>Atendemos a industria, minería y edificaciones en Lima y todo el Perú.</p>

            <div className="cinfo__group">
              <span className="cinfo__ico"><Icon name="phone" /></span>
              <div>
                <small>Teléfonos</small>
                {PHONES.map((p) => <a key={p.href} href={p.href}>{p.label}</a>)}
              </div>
            </div>
            <div className="cinfo__group">
              <span className="cinfo__ico"><Icon name="mail" /></span>
              <div>
                <small>Correos</small>
                {EMAILS.map((m) => <a key={m} href={`mailto:${m}`}>{m}</a>)}
              </div>
            </div>
            <div className="cinfo__group">
              <span className="cinfo__ico"><Icon name="pin" /></span>
              <div>
                <small>Dirección</small>
                <p>{ADDRESS}</p>
              </div>
            </div>

            <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--wa btn--block">
              <Icon name="wa" /> Escríbenos por WhatsApp
            </a>
            <span className="cinfo__deco" aria-hidden="true"></span>
          </aside>

          <form className="cform reveal reveal--right" onSubmit={submit}>
            <h3>Solicita tu cotización</h3>
            <div className="cform__row">
              <Field label="Nombre *" name="nombre" required autoComplete="name" />
              <Field label="Empresa" name="empresa" autoComplete="organization" />
            </div>
            <Field label="Teléfono *" name="telefono" type="tel" required autoComplete="tel" />

            <fieldset className="cform__chips">
              <legend>¿Qué necesitas?</legend>
              {INTERESTS.map((o) => (
                <button type="button" key={o} className="chip chip--sm" aria-pressed={interes === o} onClick={() => setInteres(o)}>
                  {o}
                </button>
              ))}
            </fieldset>

            <Field as="textarea" label="Describe tu requerimiento *" name="mensaje" rows="4" required />
            <button className="btn btn--accent btn--block btn--lg" type="submit">
              <Icon name="wa" /> Enviar por WhatsApp
            </button>
            <small className="cform__note">Se abrirá WhatsApp con tu mensaje listo para enviar.</small>
          </form>
        </div>

        <div className="map reveal">
          <iframe title="Ubicación de PEFM en Carabayllo, Lima" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={MAP_SRC}></iframe>
          <div className="map__card">
            <img src="/assets/img/emblema.png" alt="" width="40" height="42" />
            <div>
              <strong>PEFM S.A.C.</strong>
              <span>Carabayllo – Lima, Perú</span>
            </div>
            <a href="https://maps.google.com/?q=Casa+Grande+de+Punchauca+Carabayllo+Lima" target="_blank" rel="noopener" className="btn btn--primary btn--sm">
              Abrir en Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
