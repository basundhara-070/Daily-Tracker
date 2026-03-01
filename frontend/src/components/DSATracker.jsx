import { useEffect, useState } from "react";
import API from "../services/api";

export default function DSATracker() {
  const [list, setList] = useState([]);
  const [algo, setAlgo] = useState("");
  const [tc, setTc] = useState("");
  const [exp, setExp] = useState("");
  const [codeBlock, setCodeBlock] = useState("");
  const [open, setOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDSA = async () => {
    const { data } = await API.get("/dsa");
    setList(data);
  };

  const addDSA = async () => {
    if (!algo || !tc || !exp) return;
    await API.post("/dsa", {
      algorithm: algo,
      timeComplexity: tc,
      explanation: exp,
      codeBlock: codeBlock,
    });
    setAlgo("");
    setTc("");
    setExp("");
    setCodeBlock("");
    setIsModalOpen(false);
    fetchDSA();
  };

  useEffect(() => {
    fetchDSA();
  }, []);

  return (
    <section className="transform transition-all duration-500 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white border-b-2 pb-3 inline-block" style={{borderColor: '#9874d3'}}>DSA Tracker</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          style={{backgroundColor: '#9874d3', boxShadow: '0 0 15px rgba(152, 116, 211, 0.4)'}}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4)'}
        >
          Add Algo
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item, idx) => (
          <div key={item._id} className="border-2 rounded-lg bg-gray-900 backdrop-blur-sm overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl group" style={{borderColor: '#9874d3', boxShadow: '0 0 15px rgba(152, 116, 211, 0.2)'}}>
            <div
              className="flex justify-between p-5 cursor-pointer transition-colors duration-300"
              onClick={() => setOpen(open === idx ? null : idx)}
              style={{borderBottom: '2px solid rgba(152, 116, 211, 0.3)'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d2d3d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span className="font-semibold text-gray-200 group-hover:text-gray-100">{item.algorithm}</span>
              <span className="transform transition-transform duration-300" style={{color: '#9874d3', transform: open === idx ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                ▼
              </span>
            </div>

            {open === idx && (
              <div className="p-5 text-gray-200" style={{backgroundColor: '#1a1a2e', borderTop: '2px solid #9874d3'}}>
                <p className="mb-3"><strong>Time Complexity:</strong> {item.timeComplexity}</p>
                <p className="mb-4"><strong>Explanation:</strong> {item.explanation}</p>
                {item.codeBlock && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-purple-300 mb-2">C++ Code:</p>
                    <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border-l-4" style={{borderLeftColor: '#9874d3', fontFamily: 'Fira Code, Courier New, monospace'}}>
                      <code className="text-gray-100">{item.codeBlock}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-96 shadow-2xl" style={{borderColor: '#9874d3', border: '2px solid #9874d3', boxShadow: '0 0 40px rgba(152, 116, 211, 0.3)'}}>
            <h3 className="text-2xl font-bold text-white mb-6">Create New DSA</h3>
            
            <div className="space-y-4 mb-6">
              <input
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Algorithm"
                value={algo}
                onChange={e => setAlgo(e.target.value)}
                autoFocus
                style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}}
                onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              />
              <input
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Time Complexity"
                value={tc}
                onChange={e => setTc(e.target.value)}
                style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}}
                onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              />
              <textarea
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300 resize-none"
                placeholder="Explanation"
                value={exp}
                onChange={e => setExp(e.target.value)}
                style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)', minHeight: '80px'}}
                onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
              />
              <div>
                <label className="text-gray-300 text-sm mb-2 block">C++ Code Block (Optional)</label>
                <textarea
                  className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 p-3 rounded-lg focus:outline-none transition-all duration-300 resize-none font-mono text-sm"
                  placeholder='#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}'
                  value={codeBlock}
                  onChange={e => setCodeBlock(e.target.value)}
                  style={{borderWidth: '2px', borderColor: '#9874d3', boxShadow: 'inset 0 0 10px rgba(152, 116, 211, 0.1)', minHeight: '150px', fontFamily: 'Fira Code, Courier New, monospace'}}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(152, 116, 211, 0.4), inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                  onBlur={(e) => e.target.style.boxShadow = 'inset 0 0 10px rgba(152, 116, 211, 0.1)'}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setAlgo("");
                  setTc("");
                  setExp("");
                  setCodeBlock("");
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={addDSA}
                className="flex-1 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                style={{backgroundColor: '#9874d3', boxShadow: '0 0 10px rgba(152, 116, 211, 0.4)'}}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 25px rgba(152, 116, 211, 0.6)';
                  e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 0 10px rgba(152, 116, 211, 0.4)';
                  e.target.style.opacity = '1';
                }}
              >
                Add Algorithm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}