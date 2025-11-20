'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scale, Shield, FileText, Clock, Users, Zap, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-8 hover:scale-110 hover:rotate-6 transition-all duration-300">
            <Scale className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom duration-700 tracking-tight">
            LexFlow
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="w-7 h-7 text-white animate-pulse" />
            <p className="text-2xl sm:text-3xl text-white font-bold">
              Gestão Jurídica Inteligente
            </p>
            <Sparkles className="w-7 h-7 text-white animate-pulse" />
          </div>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Organize processos, gerencie prazos e colabore com clientes em uma plataforma moderna, segura e potencializada por IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 h-14 px-10 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group rounded-xl"
              >
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-black h-14 px-10 text-lg font-bold backdrop-blur-sm hover:scale-105 transition-all duration-300 rounded-xl"
              >
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24">
          {[
            {
              icon: FileText,
              title: 'Gestão de Processos',
              description: 'Organize e acompanhe todos os seus processos judiciais em um só lugar',
              gradient: 'from-gray-700 to-gray-900'
            },
            {
              icon: Clock,
              title: 'Controle de Prazos',
              description: 'Nunca perca um prazo importante com notificações automáticas',
              gradient: 'from-gray-700 to-gray-900'
            },
            {
              icon: Users,
              title: 'Gestão de Clientes',
              description: 'Mantenha informações completas e organizadas de todos os seus clientes',
              gradient: 'from-gray-700 to-gray-900'
            },
            {
              icon: Shield,
              title: 'Segurança Total',
              description: 'Seus dados protegidos com criptografia de ponta a ponta',
              gradient: 'from-gray-700 to-gray-900'
            },
            {
              icon: Zap,
              title: 'IA Integrada',
              description: 'Resumos automáticos de documentos jurídicos com inteligência artificial',
              gradient: 'from-gray-700 to-gray-900'
            },
            {
              icon: FileText,
              title: 'Documentos',
              description: 'Upload e organização de documentos com visualização integrada',
              gradient: 'from-gray-700 to-gray-900'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-32 bg-white rounded-3xl p-10 sm:p-16 border-2 border-gray-200 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-black text-center mb-16">
            Por que escolher o LexFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Interface moderna e intuitiva',
              'Acesso de qualquer dispositivo',
              'Notificações em tempo real',
              'Relatórios e estatísticas',
              'Suporte técnico dedicado',
              'Atualizações constantes'
            ].map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 text-black hover:translate-x-2 transition-transform duration-300"
              >
                <CheckCircle2 className="w-7 h-7 text-black flex-shrink-0" />
                <span className="text-lg font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-32 bg-white rounded-3xl p-16 border-2 border-gray-200 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
            Pronto para transformar sua gestão jurídica?
          </h2>
          <p className="text-gray-600 mb-10 text-xl sm:text-2xl max-w-3xl mx-auto font-medium">
            Junte-se a centenas de advogados que já confiam no LexFlow para gerenciar seus processos
          </p>
          <Link href="/register">
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 h-16 px-12 text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group rounded-xl"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-gray-500 text-base">
            © 2024 LexFlow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
