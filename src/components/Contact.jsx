import { Icon } from './Icon';
import { PHONES, EMAILS, INTERESTS, waLink } from '../data';

function handleSubmit(e) {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const msg = [
    'Hola PEFM, quisiera una cotización.',
    `*Nombre:* ${f.get('nombre')}`,
    f.get('empresa') ? `*Empresa:* ${f.get('empresa')}` : '',
    `*Teléfono:* ${f.get('telefono')}`,
    `*Interés:* ${f.get('interes')}`,
    `*Mensaje:* ${f.get('mensaje')}`,
  ].filter(Boolean).join('\n');
  window.open(waLink(msg), '_blank', 'noopener');
}

export default function Contact() {
  return (
    <section className="section section--alt section--grid" id="contacto">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Contacto</span>
          <h2>Hablemos de tu proyecto</h2>
        </div>
        <div className="contact">
          <div className="contact__cards">
            <div className="ccard reveal reveal--left" data-tilt>
              <div className="ccard__icon"><Icon name="phone" className="" /></div>
              <div>
                <h3>Teléfonos</h3>
                {PHONES.map((p) => <a key={p.href} href={p.href}>{p.label}</a>)}
              </div>
            </div>
            <div className="ccard reveal reveal--left" data-tilt>
              <div className="ccard__icon"><Icon name="mail" className="" /></div>
              <div>
                <h3>Correos</h3>
                {EMAILS.map((m) => <a key={m} href={`mailto:${m}`}>{m}</a>)}
              </div>
            </div>
            <div className="ccard reveal reveal--left" data-tilt>
              <div className="ccard__icon"><Icon name="pin" className="" /></div>
              <div>
                <h3>Dirección</h3>
                <p>Programa de Vivienda Casa Grande de Punchauca Mz. A Lt. 04 – Carabayllo – Lima</p>
              </div>
            </div>
          </div>

          <form className="form reveal reveal--right" onSubmit={handleSubmit}>
            <h3>Solicita tu cotización</h3>
            <div className="form__row">
              <label>Nombre<input name="nombre" required autoComplete="name" /></label>
              <label>Empresa<input name="empresa" autoComplete="organization" /></label>
            </div>
            <div className="form__row">
              <label>Teléfono<input name="telefono" type="tel" required autoComplete="tel" /></label>
              <label>Interés
                <select name="interes">
                  {INTERESTS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label>Mensaje<textarea name="mensaje" rows="4" required placeholder="Describe brevemente tu requerimiento"></textarea></label>
            <button className="btn btn--accent btn--block" type="submit"><Icon name="wa" /> Enviar por WhatsApp</button>
            <small className="form__note">Se abrirá WhatsApp con tu mensaje listo para enviar.</small>
          </form>
        </div>

        <div className="map reveal">
          <iframe
            title="Ubicación de PEFM en Carabayllo, Lima"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Casa%20Grande%20de%20Punchauca%2C%20Carabayllo%2C%20Lima%2C%20Per%C3%BA&z=15&output=embed"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
