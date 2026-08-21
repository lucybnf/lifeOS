import { MaterialIcon } from "../components/MaterialIcon";

export function ModulePlaceholderPage({ name }: { name: string }) {
  return (
    <section className="module-placeholder">
      <div className="module-placeholder__icon">
        <MaterialIcon name="construction" />
      </div>
      <p className="section-kicker">Próximamente</p>
      <h3>{name}</h3>
      <p>
        Este módulo está en desarrollo. Podés seguir usando Inicio y Agenda
        mientras preparamos esta sección.
      </p>
    </section>
  );
}
