// src/app/solicitacoes/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Program, Coordenador, Activity } from "@/types/types";
import programsData from "@/data/programs";
import coordenadoresData from "@/data/coordenadores";
import activitiesData from "@/data/activities";
import { UploadCloud } from "lucide-react";

export default function SolicitacoesPage() {
  // Form state
  const [program, setProgram] = useState<number | "">("");
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [orientador, setOrientador] = useState("");
  const [coordenador, setCoordenador] = useState<number | "">("");
  const [semestre, setSemestre] = useState("");
  const [codigoApo, setCodigoApo] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dados carregados (mock / futuro API)
  const [programs, setPrograms] = useState<Program[]>([]);
  const [coordenadores, setCoordenadores] = useState<Coordenador[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Dados locais por enquanto
        setPrograms(programsData);
        setCoordenadores(coordenadoresData);
        setActivities(activitiesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleActivity = (id: number) => {
    setSelectedActivities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const totalPoints = selectedActivities.reduce((acc, id) => {
    const activity = activities.find(a => a.id === id);
    return acc + (activity?.points || 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      programId: program,
      matricula,
      nome,
      orientador,
      coordenadorId: coordenador,
      semestre,
      codigoApo,
      atividadesIds: selectedActivities,
      totalPoints,
      dataEnvio: new Date().toISOString(),
      file: selectedFile, // ainda só em memória
    };

    console.log("Payload a enviar:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Formulário enviado com sucesso! (mock)");
      // Limpar formulário
      setProgram("");
      setMatricula("");
      setNome("");
      setOrientador("");
      setCoordenador("");
      setSemestre("");
      setCodigoApo("");
      setSelectedActivities([]);
      setSelectedFile(null);
    }, 1000);
  };

  if (loading) return <p className="p-6">Carregando dados...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Enviar Nova Solicitação</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Programa */}
        <div>
          <label className="block mb-1 font-medium">Selecionar programa</label>
          <select
            value={program}
            onChange={e => setProgram(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="">-- Selecione --</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Matrícula */}
        <div>
          <label className="block mb-1 font-medium">Código de matrícula</label>
          <input
            type="text"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Orientador */}
        <div>
          <label className="block mb-1 font-medium">Nome do Orientador</label>
          <input
            type="text"
            value={orientador}
            onChange={e => setOrientador(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Coordenador */}
        <div>
          <label className="block mb-1 font-medium">Selecionar Coordenador</label>
          <select
            value={coordenador}
            onChange={e => setCoordenador(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="">-- Selecione --</option>
            {coordenadores.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Semestre */}
        <div>
          <label className="block mb-1 font-medium">Semestre</label>
          <input
            type="text"
            value={semestre}
            onChange={e => setSemestre(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Código da APO */}
        <div>
          <label className="block mb-1 font-medium">Código da APO</label>
          <input
            type="text"
            value={codigoApo}
            onChange={e => setCodigoApo(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Atividades */}
        <div>
          <label className="block mb-2 font-medium">Atividades desenvolvidas</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto border border-gray-300 p-2 rounded">
            {activities.map(a => (
              <label key={a.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(a.id)}
                  onChange={() => toggleActivity(a.id)}
                  className="w-4 h-4"
                />
                <span>{a.label} ({a.points} pts)</span>
              </label>
            ))}
          </div>
          <p className="mt-2 font-medium">Total de pontos: {totalPoints}</p>
        </div>

        {/* Upload de Arquivo Profissional */}
        <div>
          <label className="block mb-1 font-medium">Anexar arquivo</label>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:border-red-500 transition-colors"
          >
            <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
            <span className="text-gray-600">
              {selectedFile ? selectedFile.name : "Clique ou arraste o arquivo aqui"}
            </span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}