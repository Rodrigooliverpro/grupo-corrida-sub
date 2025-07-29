import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './index.css';

const atletas = [
  "Laralyza Gomes",
  "Leonardo Linhares",
  "Wilker Rita",
  "Juscinalva Itagiba",
];

const treinosPorAtleta = {
  "Leonardo Linhares": [
    { dia: "Terça", tipo: "Intervalado", descricao: "5x1000m a 4:30/km", zona: "Z4-Z5" },
    { dia: "Quarta", tipo: "Rodagem Leve", descricao: "8km a 6:00/km", zona: "Z2" },
    { dia: "Quinta", tipo: "Tempo Run", descricao: "6km a 5:00/km", zona: "Z3-Z4" },
    { dia: "Sábado", tipo: "Longo", descricao: "14km a 5:30/km", zona: "Z2-Z3" },
    { dia: "Domingo", tipo: "Regenerativo", descricao: "5km a 6:20/km", zona: "Z1" },
  ],
  "Wilker Rita": [
    { dia: "Segunda", tipo: "Intervalado", descricao: "8x400m a 4:10/km", zona: "Z4-Z5" },
    { dia: "Quarta", tipo: "Tempo Run", descricao: "5km a 5:00/km", zona: "Z3-Z4" },
    { dia: "Quinta", tipo: "Rodagem Leve", descricao: "7km a 5:50/km", zona: "Z2" },
    { dia: "Sábado", tipo: "Longo", descricao: "16km a 5:20/km", zona: "Z2-Z3" },
  ],
};

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password) {
      onLogin(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded-xl shadow-lg bg-white space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full p-2 bg-blue-700 text-white rounded hover:bg-blue-800">Entrar</button>
    </form>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [atletaSelecionado, setAtletaSelecionado] = useState("Leonardo Linhares");
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const treinos = treinosPorAtleta[atletaSelecionado] || [];

  if (!usuario) {
    return <LoginForm onLogin={setUsuario} />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center text-white bg-blue-900 py-4 rounded-xl shadow-lg">
        Grupo de Corrida do SUB
      </h1>

      <div className="text-right text-sm text-gray-600">Bem-vindo, {usuario}</div>

      <div className="flex justify-center space-x-2">
        {atletas.map((atleta) => (
          <button
            key={atleta}
            className={`px-4 py-2 rounded ${atleta === atletaSelecionado ? "bg-blue-700 text-white" : "bg-gray-200"}`}
            onClick={() => setAtletaSelecionado(atleta)}
          >
            {atleta}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Treinos da Semana – {atletaSelecionado}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {treinos.map((treino, index) => (
            <div key={index} className="p-4 border rounded-xl shadow-md bg-white">
              <p className="font-bold text-lg">{treino.dia}</p>
              <p className="text-sm">Tipo: {treino.tipo}</p>
              <p className="text-sm">Descrição: {treino.descricao}</p>
              <p className="text-sm">Zona FC: {treino.zona}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-center">Calendário de Treinos</h2>
        <div className="flex justify-center">
          <Calendar onChange={setDataSelecionada} value={dataSelecionada} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-center">Volume Semanal</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={[
              { semana: "1", km: 25 },
              { semana: "2", km: 28 },
              { semana: "3", km: 32 },
              { semana: "4", km: 35 },
            ]}
          >
            <XAxis dataKey="semana" />
            <YAxis label={{ value: 'KM', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="km" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
