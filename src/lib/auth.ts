import { supabase } from './supabase';

export async function signUp(email: string, password: string, fullName: string, role: 'lawyer' | 'client') {
  try {
    // Primeiro, cria o usuário na autenticação
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (authError) {
      console.error('Erro na autenticação:', authError);
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Erro ao criar usuário');
    }

    // Aguarda um pouco para garantir que o usuário foi criado
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Tenta inserir o perfil na tabela users
    try {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          full_name: fullName,
          role,
        });

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        // Se der erro na criação do perfil, não bloqueia o cadastro
        // O perfil pode ser criado depois via trigger no Supabase
      }
    } catch (profileErr) {
      console.error('Erro ao inserir perfil:', profileErr);
      // Continua mesmo se der erro no perfil
    }

    return authData;
  } catch (error: any) {
    console.error('Erro no signUp:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro no login:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error('Erro no signIn:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro no logout:', error);
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error('Erro no signOut:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return profile;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

export async function getSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Erro ao buscar sessão:', error);
    return null;
  }
}
