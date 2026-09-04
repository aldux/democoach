export default function ClinicCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">


      {/* Content Area */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-sanpatricio-secondary/20 text-sanpatricio-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            {data.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 leading-tight">{data.title}</h3>
        
        <p className="mt-1 text-gray-600 text-sm">
          {data.description}
        </p>

        {data.steps && data.steps.length > 0 && (
          <div className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-sm text-gray-800 mb-2">Paso a paso:</h4>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1.5">
              {data.steps.map((step, index) => (
                <li key={index} className="pl-1 text-gray-600">
                  <span className="text-gray-800 font-medium">{step.split(':')[0]}</span>
                  {step.includes(':') ? ':' + step.split(':').slice(1).join(':') : ''}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
