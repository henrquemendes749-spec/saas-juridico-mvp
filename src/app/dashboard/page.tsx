'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Process, Deadline, Notification } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  FolderOpen,
  Calendar,
  Bell,
  Plus,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [processes, setProcesses] = useState<Process[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState({
    totalProcesses: 0,
    activeProcesses: 0,
    pendingDeadlines: 0,
    totalClients: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  async function loadDashboardData() {
    if (!user) return;

    // Load processes
    const { data: processesData } = await supabase
      .from('processes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (processesData) setProcesses(processesData);

    // Load upcoming deadlines
    const { data: deadlinesData } = await supabase
      .from('deadlines')
      .select('*, processes(title)')
      .eq('status', 'pending')
      .order('due_date', { ascending: true })
      .limit(5);

    if (deadlinesData) setDeadlines(deadlinesData as any);

    // Load notifications
    const { data: notificationsData } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .eq('read', false)
      .order('created_at', { ascending: false })
      .limit(5);

    if (notificationsData) setNotifications(notificationsData);

    // Load stats
    const { count: totalProcesses } = await supabase
      .from('processes')
      .select('*', { count: 'exact', head: true });

    const { count: activeProcesses } = await supabase
      .from('processes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { count: pendingDeadlines } = await supabase
      .from('deadlines')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: totalClients } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    setStats({
      totalProcesses: totalProcesses || 0,
      activeProcesses: activeProcesses || 0,
      pendingDeadlines: pendingDeadlines || 0,
      totalClients: totalClients || 0,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'archived': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'pending': return 'Pendente';
      case 'closed': return 'Encerrado';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Bem-vindo, {user.full_name}! 👋
              </h1>
              <p className="text-gray-400 text-lg">
                Aqui está um resumo das suas atividades jurídicas
              </p>
            </div>
            {user.role === 'lawyer' && (
              <Button 
                className="bg-white text-black hover:bg-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group h-12 px-6 font-bold rounded-xl"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Novo Processo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200 animate-in fade-in slide-in-from-bottom duration-500 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-semibold">Total de Processos</p>
                <p className="text-5xl font-bold text-black">{stats.totalProcesses}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Todos os processos
                </p>
              </div>
              <div className="bg-black p-4 rounded-2xl shadow-xl">
                <FolderOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200 animate-in fade-in slide-in-from-bottom duration-500 delay-100 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-semibold">Processos Ativos</p>
                <p className="text-5xl font-bold text-black">{stats.activeProcesses}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Em andamento
                </p>
              </div>
              <div className="bg-black p-4 rounded-2xl shadow-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200 animate-in fade-in slide-in-from-bottom duration-500 delay-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-semibold">Prazos Pendentes</p>
                <p className="text-5xl font-bold text-black">{stats.pendingDeadlines}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Requer atenção
                </p>
              </div>
              <div className="bg-black p-4 rounded-2xl shadow-xl">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          {user.role === 'lawyer' && (
            <Card className="p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200 animate-in fade-in slide-in-from-bottom duration-500 delay-300 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-semibold">Total de Clientes</p>
                  <p className="text-5xl font-bold text-black">{stats.totalClients}</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Cadastrados
                  </p>
                </div>
                <div className="bg-black p-4 rounded-2xl shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Processes */}
          <Card className="lg:col-span-2 p-8 bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-gray-200 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-black flex items-center gap-3">
                <div className="bg-black p-3 rounded-xl">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                Processos Recentes
              </h2>
              <Link href="/processes">
                <Button variant="ghost" size="sm" className="hover:bg-black hover:text-white transition-colors font-bold rounded-xl">
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {processes.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <FolderOpen className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-bold mb-2 text-lg">Nenhum processo cadastrado</p>
                  <p className="text-sm text-gray-500 mb-6">Comece criando seu primeiro processo</p>
                  <Button className="bg-black hover:bg-gray-800 text-white font-bold rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Processo
                  </Button>
                </div>
              ) : (
                processes.map((process, index) => (
                  <div
                    key={process.id}
                    className="p-5 border-2 border-gray-200 rounded-2xl hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer group animate-in fade-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-black mb-1 group-hover:text-gray-700 transition-colors text-lg">
                          {process.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 font-medium">
                          <FileText className="w-4 h-4" />
                          Nº {process.number}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(process.status)} transition-colors font-bold`}>
                        {getStatusLabel(process.status)}
                      </Badge>
                    </div>
                    {process.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-3">{process.description}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Upcoming Deadlines & Notifications */}
          <div className="space-y-6">
            {/* Deadlines */}
            <Card className="p-6 bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-gray-200 rounded-2xl">
              <h2 className="text-2xl font-bold text-black mb-5 flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                Próximos Prazos
              </h2>

              <div className="space-y-3">
                {deadlines.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-gray-200">
                    <CheckCircle2 className="w-14 h-14 text-black mx-auto mb-3" />
                    <p className="text-sm text-black font-bold">Nenhum prazo pendente</p>
                    <p className="text-xs text-gray-600 mt-1">Você está em dia!</p>
                  </div>
                ) : (
                  deadlines.map((deadline, index) => (
                    <div
                      key={deadline.id}
                      className="p-4 bg-gray-50 border-l-4 border-black rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-right duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-black truncate">
                            {deadline.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(deadline.due_date), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6 bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-2 border-gray-200 rounded-2xl">
              <h2 className="text-2xl font-bold text-black mb-5 flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                Notificações
              </h2>

              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-gray-200">
                    <Bell className="w-14 h-14 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-black font-bold">Nenhuma notificação</p>
                    <p className="text-xs text-gray-600 mt-1">Você está atualizado!</p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className="p-4 bg-gray-50 border-l-4 border-black rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-right duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="text-sm font-bold text-black mb-1">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
