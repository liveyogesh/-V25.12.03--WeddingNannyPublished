import React from 'react';
import { useTheme } from '../../context/ThemeContext.tsx';

const AdminAuditHistory: React.FC = () => {
  const { auditHistory } = useTheme();

  return (
    <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 animate-fadeIn">
      <h2 className="text-4xl font-black text-navy-gemini mb-12 font-sans">Audit Registry</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b pb-6">
              <th className="pb-8 px-6">Event Time</th>
              <th className="pb-8 px-6">Violations</th>
              <th className="pb-8 px-6">Integrity Score</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {auditHistory.map((h, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-all">
                <td className="py-8 px-6">
                  <div className="font-black text-navy-gemini">{new Date(h.timestamp).toLocaleDateString()}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-black">{new Date(h.timestamp).toLocaleTimeString()}</div>
                </td>
                <td className="py-8 px-6 font-black text-rose-500">{h.issuesCount} Issues</td>
                <td className="py-8 px-6">
                  <span className={`font-black text-xl ${h.overall > 85 ? 'text-green-500' : 'text-rose-500'}`}>{h.overall}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAuditHistory;