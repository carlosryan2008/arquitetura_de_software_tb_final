import { useState } from 'react';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import type { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: email,
      role: email.includes('teacher') ? 'teacher' : email.includes('admin') ? 'admin' : 'student'
    };
    
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center gap-2 mb-4 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EduConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de Volta</h1>
          <p className="text-gray-600">Entre para continuar sua jornada de aprendizado</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Endereço de Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Dica: Use "teacher@exemplo.com" para entrar como professor, "admin@exemplo.com" como admin
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Lembrar de mim</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Não tem uma conta?{' '}
              <button
                onClick={() => onNavigate('student-signup')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cadastre-se como Estudante
              </button>
              {' ou '}
              <button
                onClick={() => onNavigate('teacher-signup')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Professor
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Voltar para Início
          </button>
        </div>
      </div>
    </div>
  );
}
