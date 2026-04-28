import { StyleSheet, Platform } from 'react-native';

export const estilos = StyleSheet.create({
  
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#F8FAFC' 
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#1E293B', 
    letterSpacing: -0.5,
    marginBottom: 24 
  },
  
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8, textTransform: 'uppercase' },
  input: { 
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5, 
    borderColor: '#E2E8F0', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 16,
    color: '#1E293B',
    ...Platform.select({
      web: { boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
      android: { elevation: 2 }
    })
  },

  card: { 
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
      android: { elevation: 4 }
    })
  },
  nomeItem: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  infoItem: { fontSize: 14, color: '#64748B', marginTop: 4, fontWeight: '500' },

  btnPrincipal: { 
    backgroundColor: '#4F46E5', // Indigo
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8
  },
  btnTexto: { color: '#FFFFFF', fontWeight: '800', fontSize: 16, letterSpacing: 0.5 },
  
  btnSecundario: { 
    backgroundColor: '#F1F5F9', 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 12 
  },
  btnTextoSecundario: { color: '#475569', fontWeight: '700', fontSize: 16 },

  areaBotoes: { flexDirection: 'row', gap: 12 },

  fab: { 
    position: 'absolute', bottom: 40, right: 30, 
    backgroundColor: '#4F46E5', width: 64, height: 64, 
    borderRadius: 20, justifyContent: 'center', alignItems: 'center', 
    elevation: 10,
    transform: [{ rotate: '45deg' }] // Detalhe de design moderno
  },
  fabTexto: { color: 'white', fontSize: 32, transform: [{ rotate: '-45deg' }] }
});