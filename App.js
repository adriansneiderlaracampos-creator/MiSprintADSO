import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  // Estado inicial con 3 tareas de ejemplo (HU05 - CA01)
  const [tareas, setTareas] = useState([
    { id: '1', titulo: 'Definir requerimientos de software', categoria: 'Análisis', completada: false },
    { id: '2', titulo: 'Diseñar prototipo de interfaz', categoria: 'Diseño', completada: false },
    { id: '3', titulo: 'Configurar entorno React Native', categoria: 'Código', completada: true },
  ]);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Análisis');

  const categoriasDisponibles = ['Análisis', 'Diseño', 'Código'];

  // HU03 & HU04: Agregar nueva tarea con validación
  const agregarTarea = () => {
    if (!titulo.trim()) {
      Alert.alert('Advertencia', 'Debes ingresar un título para la tarea.');
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      categoria,
      completada: false,
    };

    setTareas([...tareas, nuevaTarea]);
    setTitulo('');
  };

  // HU06: Alternar estado completada / pendiente
  const alternarEstado = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  // HU07: Eliminar tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // HU08: Métricas calculadas dinámicamente
  const totalTareas = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = totalTareas - completadas;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9F1239" />
      
      {/* HU01: Identidad de la app con diseño de tarjeta moderna */}
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <Text style={styles.appTitle}>🚀 Mi Sprint ADSO</Text>
          <View style={styles.fichaBadge}>
            <Text style={styles.fichaText}>Ficha: 3409609</Text>
          </View>
        </View>
        <Text style={styles.userText}>Aprendiz: Adrian Sneider Lara Campos</Text>
      </View>

      {/* HU08: Resumen de avance en formato de panel métrico */}
      <View style={styles.dashboardGrid}>
        <View style={[styles.dashCard, styles.dashTotal]}>
          <Text style={styles.dashNum}>{totalTareas}</Text>
          <Text style={styles.dashLabel}>Total</Text>
        </View>
        <View style={[styles.dashCard, styles.dashPending]}>
          <Text style={[styles.dashNum, { color: '#B45309' }]}>{pendientes}</Text>
          <Text style={styles.dashLabel}>Pendientes</Text>
        </View>
        <View style={[styles.dashCard, styles.dashCompleted]}>
          <Text style={[styles.dashNum, { color: '#047857' }]}>{completadas}</Text>
          <Text style={styles.dashLabel}>Completadas</Text>
        </View>
      </View>

      {/* HU02, HU03, HU04: Formulario de registro estilizado */}
      <View style={styles.cardForm}>
        <Text style={styles.sectionTitle}>Nueva Actividad del Sprint</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="¿Qué tarea vas a realizar?"
          placeholderTextColor="#9CA3AF"
          value={titulo}
          onChangeText={setTitulo}
        />
        
        <View style={styles.categoryContainer}>
          {categoriasDisponibles.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catChip,
                categoria === cat && styles.catChipActive,
              ]}
              onPress={() => setCategoria(cat)}
            >
              <Text
                style={[
                  styles.catChipText,
                  categoria === cat && styles.catChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={agregarTarea}>
          <Text style={styles.submitBtnText}>+ Agregar tarea al tablero</Text>
        </TouchableOpacity>
      </View>

      {/* HU05, HU06, HU07: Lista interactiva de tareas con tarjetas limpias */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTextTitle}>Tablero vacío</Text>
            <Text style={styles.emptyTextSub}>
              Todavía no hay tareas registradas en este sprint.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskItemCard,
              item.completada && styles.taskItemCompleted,
            ]}
          >
            <View style={styles.taskContentWrapper}>
              <Text
                style={[
                  styles.taskTitleText,
                  item.completada && styles.taskTitleCompletedText,
                ]}
              >
                {item.titulo}
              </Text>
              <View style={styles.badgeRow}>
                <View style={styles.tagCategory}>
                  <Text style={styles.tagCategoryText}>{item.categoria}</Text>
                </View>
                <View
                  style={[
                    styles.tagStatus,
                    item.completada ? styles.statusDone : styles.statusWait,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagStatusText,
                      item.completada ? styles.statusDoneText : styles.statusWaitText,
                    ]}
                  >
                    {item.completada ? 'Completada' : 'Pendiente'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.taskActionsCol}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  item.completada ? styles.btnUndo : styles.btnDone,
                ]}
                onPress={() => alternarEstado(item.id)}
              >
                <Text style={styles.actionButtonText}>
                  {item.completada ? 'Reabrir' : 'Completar'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.btnTrash]}
                onPress={() => eliminarTarea(item.id)}
              >
                <Text style={styles.actionButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF5F5', paddingTop: 10 },
  headerCard: {
    backgroundColor: '#9F1239',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 16,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  fichaBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  fichaText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  userText: { fontSize: 13, color: '#FEE2E2', marginTop: 6 },
  dashboardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 14,
  },
  dashCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dashTotal: { borderTopWidth: 3, borderTopColor: '#9F1239' },
  dashPending: { borderTopWidth: 3, borderTopColor: '#D97706' },
  dashCompleted: { borderTopWidth: 3, borderTopColor: '#059669' },
  dashNum: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  dashLabel: { fontSize: 11, color: '#6B7280', marginTop: 2, fontWeight: '500' },
  cardForm: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8 },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  catChip: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  catChipActive: { backgroundColor: '#9F1239', borderColor: '#9F1239' },
  catChipText: { fontSize: 12, color: '#4B5563', fontWeight: '600' },
  catChipTextActive: { color: '#FFFFFF' },
  submitBtn: {
    backgroundColor: '#9F1239',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  submitBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  listContainer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 30 },
  emptyBox: { padding: 24, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, marginTop: 5 },
  emptyTextTitle: { fontSize: 15, fontWeight: 'bold', color: '#4B5563', marginBottom: 4 },
  emptyTextSub: { color: '#6B7280', fontSize: 12, textAlign: 'center' },
  taskItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#9F1239',
  },
  taskItemCompleted: { backgroundColor: '#F9FAFB', borderLeftColor: '#9CA3AF', opacity: 0.85 },
  taskContentWrapper: { flex: 1, marginRight: 10 },
  taskTitleText: { fontSize: 15, fontWeight: '600', color: '#1F2937', marginBottom: 6 },
  taskTitleCompletedText: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tagCategory: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  tagCategoryText: { color: '#9F1239', fontSize: 10, fontWeight: '700' },
  tagStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusWait: { backgroundColor: '#FEF3C7' },
  statusDone: { backgroundColor: '#D1FAE5' },
  tagStatusText: { fontSize: 10, fontWeight: '700' },
  statusWaitText: { color: '#B45309' },
  statusDoneText: { color: '#047857' },
  taskActionsCol: { justifyContent: 'center', gap: 6 },
  actionButton: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, alignItems: 'center' },
  btnDone: { backgroundColor: '#9F1239' },
  btnUndo: { backgroundColor: '#6B7280' },
  btnTrash: { backgroundColor: '#DC2626' },
  actionButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
});