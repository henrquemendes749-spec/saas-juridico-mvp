'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, Check, Copy, ExternalLink, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function DomainPage() {
  const [customDomain, setCustomDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const vercelDomain = 'lexflow.vercel.app'; // Domínio padrão Vercel

  const handleCheckDomain = async () => {
    if (!customDomain) {
      toast.error('Digite um domínio válido');
      return;
    }

    setIsChecking(true);
    // Simulação de verificação
    setTimeout(() => {
      setIsChecking(false);
      toast.success('Domínio disponível! Configure o DNS para continuar.');
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para área de transferência!');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-6">
            <Globe className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Configurar Domínio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Configure um domínio personalizado para seu LexFlow
          </p>
        </div>

        {/* Current Domain */}
        <Card className="bg-white border-2 border-gray-200 p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black">Domínio Atual</h2>
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              <Check className="w-5 h-5" />
              Ativo
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-gray-600" />
              <span className="text-lg font-mono text-black">{vercelDomain}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(vercelDomain)}
                className="border-2 border-gray-300 hover:bg-gray-100"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://${vercelDomain}`, '_blank')}
                className="border-2 border-gray-300 hover:bg-gray-100"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir
              </Button>
            </div>
          </div>
        </Card>

        {/* Add Custom Domain */}
        <Card className="bg-white border-2 border-gray-200 p-8 mb-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-7 h-7 text-black" />
            <h2 className="text-2xl font-bold text-black">Adicionar Domínio Personalizado</h2>
          </div>
          <p className="text-gray-600 mb-6 text-lg">
            Configure um domínio próprio como <span className="font-mono font-bold">seuescritorio.com.br</span>
          </p>
          <div className="flex gap-3 mb-6">
            <Input
              type="text"
              placeholder="exemplo: meuescritorio.com.br"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="flex-1 h-14 text-lg border-2 border-gray-300 focus:border-black"
            />
            <Button
              onClick={handleCheckDomain}
              disabled={isChecking}
              className="bg-black text-white hover:bg-gray-800 h-14 px-8 text-lg font-bold"
            >
              {isChecking ? 'Verificando...' : 'Verificar'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-blue-900">
              <p className="font-semibold mb-1">Importante:</p>
              <p className="text-sm">
                Você precisará configurar os registros DNS no seu provedor de domínio após a verificação.
              </p>
            </div>
          </div>
        </Card>

        {/* Domain Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-2 border-gray-200 p-6 hover:border-black hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Registro.br</h3>
              <p className="text-gray-600 mb-4 text-sm">Domínios .com.br</p>
              <p className="text-3xl font-bold text-black mb-4">R$ 40<span className="text-lg text-gray-600">/ano</span></p>
              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-100"
                onClick={() => window.open('https://registro.br', '_blank')}
              >
                Visitar Site
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="bg-white border-2 border-gray-200 p-6 hover:border-black hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">GoDaddy</h3>
              <p className="text-gray-600 mb-4 text-sm">Domínios internacionais</p>
              <p className="text-3xl font-bold text-black mb-4">R$ 50<span className="text-lg text-gray-600">/ano</span></p>
              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-100"
                onClick={() => window.open('https://godaddy.com', '_blank')}
              >
                Visitar Site
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="bg-white border-2 border-gray-200 p-6 hover:border-black hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Namecheap</h3>
              <p className="text-gray-600 mb-4 text-sm">Preços competitivos</p>
              <p className="text-3xl font-bold text-black mb-4">$10<span className="text-lg text-gray-600">/ano</span></p>
              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-100"
                onClick={() => window.open('https://namecheap.com', '_blank')}
              >
                Visitar Site
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* DNS Configuration Guide */}
        <Card className="bg-white border-2 border-gray-200 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-black mb-6">Guia de Configuração DNS</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-black mb-3">1. Adicione um registro A:</h3>
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 font-mono text-sm">
                <div className="grid grid-cols-3 gap-4 mb-2 font-bold text-black">
                  <span>Tipo</span>
                  <span>Nome</span>
                  <span>Valor</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-gray-700">
                  <span>A</span>
                  <span>@</span>
                  <span>76.76.21.21</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-black mb-3">2. Adicione um registro CNAME:</h3>
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 font-mono text-sm">
                <div className="grid grid-cols-3 gap-4 mb-2 font-bold text-black">
                  <span>Tipo</span>
                  <span>Nome</span>
                  <span>Valor</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-gray-700">
                  <span>CNAME</span>
                  <span>www</span>
                  <span>cname.vercel-dns.com</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="text-yellow-900">
                <p className="font-semibold mb-1">Atenção:</p>
                <p className="text-sm">
                  A propagação DNS pode levar até 48 horas. Após configurar, aguarde e verifique novamente.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
