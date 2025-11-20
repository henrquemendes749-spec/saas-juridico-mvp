'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Scale, Mail, Lock, User, AlertCircle, Eye, EyeOff, CheckCircle2, X, Briefcase, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'lawyer' | 'client'>('lawyer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validações em tempo real
  const passwordValidations = {
    length: password.length >= 6,
    match: password === confirmPassword && confirmPassword.length > 0,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Por favor, insira seu nome completo');
      toast.error('Nome completo é obrigatório');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      toast.error('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      toast.error('Senha muito curta');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, fullName, role);
      toast.success('Conta criada com sucesso!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (err: any) {
      console.error('Erro no cadastro:', err);
      const errorMessage = err.message || 'Erro ao criar conta. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-6 hover:scale-110 transition-transform duration-300">
            <Scale className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">LexFlow</h1>
          <p className="text-gray-400 text-lg">Gestão Jurídica Inteligente</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 animate-in fade-in slide-in-from-bottom duration-700 max-h-[85vh] overflow-y-auto">
          <h2 className="text-3xl font-bold text-black mb-2">Criar conta</h2>
          <p className="text-gray-600 mb-6">Preencha os dados para começar</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-900 font-semibold">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-xl text-base transition-all"
                  placeholder="João Silva"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-xl text-base transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900 font-semibold">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-xl text-base transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  {passwordValidations.length ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={passwordValidations.length ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    Mínimo 6 caracteres
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-900 font-semibold">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-xl text-base transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  {passwordValidations.match ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={passwordValidations.match ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    Senhas coincidem
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-gray-900 font-semibold block">Tipo de conta</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as 'lawyer' | 'client')}>
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  role === 'lawyer' 
                    ? 'border-black bg-gray-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value="lawyer" id="lawyer" className="border-2" />
                  <Label htmlFor="lawyer" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${role === 'lawyer' ? 'bg-black' : 'bg-gray-200'}`}>
                      <Briefcase className={`w-5 h-5 ${role === 'lawyer' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Advogado</div>
                      <div className="text-sm text-gray-600">Gerenciar processos e clientes</div>
                    </div>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  role === 'client' 
                    ? 'border-black bg-gray-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value="client" id="client" className="border-2" />
                  <Label htmlFor="client" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${role === 'client' ? 'bg-black' : 'bg-gray-200'}`}>
                      <UserCircle className={`w-5 h-5 ${role === 'client' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Cliente</div>
                      <div className="text-sm text-gray-600">Acompanhar meus processos</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 h-13 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-xl mt-6"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Criando conta...
                </span>
              ) : (
                'Criar conta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-black font-bold hover:underline transition-all">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6 animate-in fade-in duration-1000">
          © 2024 LexFlow. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
