import type { Series } from './Legend';

/** A visually hidden table so screen readers and copy-paste get the numbers. */
export function DataTable(props: { caption?: string; series: Series[]; labels: string[] }) {
  return (
    <div className="amb-sr">
      <table>
        <caption>{props.caption || 'Chart data'}</caption>
        <thead>
          <tr>
            {/* The corner cell is a td: an empty th fails axe's empty-table-header rule. */}
            <td />
            {props.series.map((s, i) => (
              <th key={i} scope="col">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.labels.map((l, i) => (
            <tr key={i}>
              <th scope="row">{l}</th>
              {props.series.map((s, j) => (
                <td key={j}>{String(s.values[i])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
