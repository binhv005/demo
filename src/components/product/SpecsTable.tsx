import React from 'react';

interface SpecsTableProps {
  specs: Record<string, string>;
  className?: string;
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ specs, className = '' }) => {
  const entries = Object.entries(specs);

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white ${className}`}>
      <table className="w-full text-left text-xs sm:text-sm">
        <tbody>
          {entries.map(([key, value], idx) => (
            <tr
              key={key}
              className={`border-b border-slate-100 last:border-0 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
              }`}
            >
              <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-700 w-1/3 sm:w-2/5 border-r border-slate-100">
                {key}
              </td>
              <td className="py-3.5 px-4 sm:px-6 text-slate-900 font-medium leading-relaxed">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
